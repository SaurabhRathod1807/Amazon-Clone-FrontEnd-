import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpclient:HttpClient) { }

  checkadmin(admin:Admin){
    return this.httpclient.post<boolean>("http://localhost:8083/amazon/admin/check",admin);
  }
}

export class Admin{
  name:string;
  password:String;
  email:String;

  constructor(name:string, password:string, email:string){
    this.name=name;
    this.password=password;
    this.email=email;
  }
}
