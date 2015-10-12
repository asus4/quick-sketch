const $ = require('jquery');

export default class TumblrFeed {

  constructor() {
    this.user = null;
    this.json = null;
    this.total = 0;
    this.lastImageUrl = '';
  }

  initialize(user) {
    const self = this;
    this.user = user;
    return new Promise((resolve, reject)=>{
      const url = `http://${user}.tumblr.com/api/read/json`;
      $.ajax({
        url:url,
        dataType:'jsonp',
        data:{
          num:1,
          type:'photo'
        },
        success:(results)=>{
          self.total = results['posts-total'];
          resolve(results);
        },
        error:(error)=>{
          reject();
        }
      });
    });
  }

  loadPhotoAsync(start) {
    const self = this;
    return new Promise((resolve, reject)=>{
      const url = `http://${self.user}.tumblr.com/api/read/json`;
      $.ajax({
        url:url,
        dataType:'jsonp',
        data:{
          num:1,
          type:'photo',
          start:start
        },
        success:(results)=>{
          self.total = results['posts-total'];
          self.lastImageUrl = results.posts[0]['photo-url-1280'];
          resolve(results.posts[0]['photo-url-1280']);
        },
        error:(error)=>{
          reject();
        }
      });
    });
  }
}
