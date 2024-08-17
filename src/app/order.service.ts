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

  remove(userId:any , productId:any){
    return this.httpclient.delete("http://localhost:8081/amazon/order/remove/"+userId +"/" + productId)
  }

  getorder(id:any){
    return this.httpclient.get("http://localhost:8081/amazon/order/getorder/"+ id);
    }
}

export class Order{
  id:any
  userId:string;
   productId:string;
   
   
 
   constructor(userId:string, productId:string , id:any){
    this.id=id;
    this.userId=UserService.user.userId;
     this.productId=ProductService.product.productId;
   }
 }
