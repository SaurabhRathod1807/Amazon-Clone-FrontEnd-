import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  static product: any;

  constructor(private httpclient:HttpClient) { }
  // http://localhost:8082/product/

  saveproduct(product:Product){
    return this.httpclient.post("http://localhost:8082/amazon/product/saveproduct",product);
  }

  getallproduct(){
    return this.httpclient.get<Product[]>("http://localhost:8082/amazon/product/getallproduct");
  }

  getproduct(productId:string){
    return this.httpclient.get("http://localhost:8082/amazon/product/getproduct/" + productId)
  }

  updateproduct(productId:string){
    return this.httpclient.put("http://localhost:8082/amazon/product/updateproduct", {productId:Product});
  }

  removeproduct(productId:string){
    return this.httpclient.delete("http://localhost:8082/amazon/product/remove/"+productId)
  }
}

export class Product{
   productId:string;
	
	 name:string;
	 price:number;
	 rating:number;
	 imageurl:string;

   constructor(productId:string, name:string, price:number, rating:number,imageurl:string){
    this.productId=productId;
    this.name=name;
    this.price=price;
    this.rating=rating;
    this.imageurl=imageurl

   }
}
