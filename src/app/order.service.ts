import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpclient:HttpClient, private userservice:UserService, private productservice:ProductService) { }

  add(order:any){
    return this.httpclient.post("http://localhost:8081/amazon/order/add", order);
  }

  show(userId:any){
    return this.httpclient.get("http://localhost:8081/amazon/order/show/" + userId);
  }
}

export class Order{
  userId:string;
   productId:string;
   
 
   constructor(userId:string, productId:string ){
     this.userId=UserService.user.userId;
     this.productId=ProductService.product.productId;
   }
 }
