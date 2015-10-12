require("babel/polyfill");
const $ = require('jquery');

let DURATION = 60;

function parseUrl() {
  const search = location.search.substring(1);
  if (search == '') {
    return;
  }
  // http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
  const param = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  DURATION = param.time;
}

function initialize() {
  parseUrl();
  let account = $('#tumblr_account')[0];
  let submit = $('#tumblr_submit');
  submit.click((event)=>{
    loadUser(account.value);
  });
  account.value = loadLastAccount();
}

function loadUser(user, start=0) {
  const url = `http://${user}.tumblr.com/api/read/json`;
  $.ajax({
    url:url,
    data:{
      num:1,
      type:'photo',
      start:start
    },
    dataType:'jsonp',
    success:(results)=>{
      $('#addressinput').fadeOut(500);
      saveLastAccount(user);
      loadPhoto(results.posts[0]['photo-url-1280']);
      nextSketch(results);
    }
  });
}

function saveLastAccount(account) {
  window.localStorage.setItem('last_account', account);
}

function loadLastAccount() {
  return window.localStorage.getItem('last_account');
}

function nextSketch(json) {
  console.log(json);
  const total = json['posts-total'];
  const user = json.tumblelog.name;
  setTimeout(()=>{
    let start = Math.floor(Math.random()*total);
    loadUser(user, start);
  },1000*DURATION);
}

function loadPhoto(url) {
  const photo = $('#tumblr_photo');
  photo.bind('load', ()=>{
    photo.fadeIn(1000);
  });
  photo.fadeOut(1000, ()=>{
    photo[0].src = url;
  });
}

initialize();
