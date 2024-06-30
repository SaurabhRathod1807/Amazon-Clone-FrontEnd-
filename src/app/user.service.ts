import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static user: any;

  constructor(private httpclient:HttpClient) { }
  // http://localhost:8083/amazon/user/

  saveuser(user:User){
    return this.httpclient.post("http://localhost:8083/amazon/user/saveuser",user);
  }

  getuser(userId:string){
    return this.httpclient.get("http://localhost:8083/amazon/user/getUser" + userId);
  }

  deleteuser(userId:string){
    return this.httpclient.delete("http://localhost:8083/amazon/user/remove" + userId)

  }

  updatuser(userId:string){
    return this.httpclient.post("http://localhost:8083/amazon/user/updateuser", {userId:User});
  }

  login(user:User){
    return  this.httpclient.post<boolean>("http://localhost:8083/amazon/user/login",user);
  }

  logout(){
    return this.httpclient.post<boolean>("http://localhost:8083/amazon/user/logout", {});
  }
}

export class User{
  userId:string;
  name:string;
  password:string;
  email:string;

  constructor(userId:string, name:string, password:string, email:string){
    this.userId=userId;
    this.name=name;
    this.password=password;
    this.email=email
  }
}
