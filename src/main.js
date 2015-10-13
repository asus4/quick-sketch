require("babel/polyfill");
const $ = require('jquery');
const util = require('./util.js');
const TumblrFeed = require('./TumblrFeed.js');
const CounterLabel = require('./CounterLabel.js');

let DURATION = 60;
const feed = new TumblrFeed();
const counterLabel = new CounterLabel('timer_label');

function initialize() {
  const param = util.parseUrlParam();
  if(param.time) {
    DURATION = param.time;
  }
  let account = $('#tumblr_account')[0];
  let submit = $('#tumblr_submit');
  account.value = loadLastAccount();
  submit.click((event)=>{
    start(account.value);
  });
}

async function start(account) {
  await feed.initialize(account);
  saveLastAccount(account);
  $('#addressinput').fadeOut(500);

  while(true) {
    let start = Math.floor(Math.random()*feed.total);
    await feed.loadPhotoAsync(start);
    await loadPhoto(feed.lastImageUrl);
    await counterLabel.countUp(DURATION);
  }
}

function saveLastAccount(account) {
  window.localStorage.setItem('last_account', account);
}

function loadLastAccount() {
  return window.localStorage.getItem('last_account');
}

function loadPhoto(url) {
  return new Promise((resolve, reject)=>{
    const photo = $('#tumblr_photo');
    photo.bind('load', ()=>{
      let img = photo[0];
      const w = window.innerWidth;
      const h = window.innerHeight;
      const aspect = w/h;
      if (img.width / img.height < aspect) {
        img.style.width = 'auto';
        img.style.height = '100%';
      }
      else {
        img.style.width = '100%';
        img.style.height = 'auto';
      }
      photo.fadeIn(1000);
      resolve();
    });
    photo.fadeOut(1000, ()=>{
      photo[0].src = url;
    });
  });
}

initialize();
