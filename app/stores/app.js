import {observable, computed} from 'mobx';

class AppStore {
  @observable loggedIn = false;
  @observable website = undefined;
  @observable user = undefined;
  @observable prevUrl = undefined;

  constructor(){
    this.isLoggedIn();
  }

  isLoggedIn(){
    var self = this;
    $.ajax({
      url:"/api/me"
    })
    .done((user)=>{
      self.user = user;
      self.loggedIn = true;
    })
    .fail((err)=>{
      self.user = undefined;
      self.loggedIn = false;
    })
  }

  login(username, password, callback=()=>{}){
    var self = this;
    $.ajax({
      url:"/api/login",
      method:"post",
      data:{username:username,password:password},
    })
    .done((user)=>{
      self.user = user;
      self.loggedIn = true;
      callback(true, user);
    })
    .fail((err)=>{
      self.user = null;
      self.loggedIn = false;
      callback(false, null);
    })
  }

  register(username, password, callback=()=>{}){
    var self = this;
    $.ajax({
      url:"/api/user",
      method:"post",
      data:{username:username,password:password},
    })
    .done((user)=>{
      callback(true, user);
    })
    .fail((err)=>{
      callback(false, null);
    })
  }

}

var singleton = new AppStore();
export default singleton;
