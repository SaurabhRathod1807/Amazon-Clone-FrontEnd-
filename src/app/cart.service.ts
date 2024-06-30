import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserService } from './user.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclient:HttpClient, private userservice:UserService, private productservice:ProductService) { }
  
  // http://localhost:8083/amazon/cart

  add(cart:any){
    return this.httpclient.post("http://localhost:8081/amazon/cart/add", cart);
  }

  show(userId:any){
    return this.httpclient.get("http://localhost:8081/amazon/cart/show/" + userId);
  }

  removeproduct(userId:any, productId:any){
    return this.httpclient.delete("http://localhost:8081/amazon/cart/remove/"+userId+"/"+productId)
  }
}



export class Cart{
 userId:string;
  productId:string;
  

  constructor(userId:string, productId:string ){
    this.userId=UserService.user.userId;
    this.productId=ProductService.product.productId;
  }
}
