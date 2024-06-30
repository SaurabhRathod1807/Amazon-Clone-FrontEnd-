import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminaction.component.html',
  styleUrl: './adminaction.component.css'
})
export class AdminactionComponent  implements OnInit{
  name:any="";
  message:any="";
  
  newProduct: Product = new Product('', '', 0, 0, '');
  constructor(private productservice:ProductService, private router:Router){}

  ngOnInit(): void {
    this.message=sessionStorage.getItem("message");
  this.name=  sessionStorage.getItem("name");
  }

  saveProduct() {
    this.productservice.saveproduct(this.newProduct).subscribe(
      (response: any) => {
        console.log('Product saved successfully', response);
        this.newProduct = new Product('', '', 0, 0, '');
      },
      (error) => {
        console.error('Error saving product', error);
      }
    );
  }

  removeproduct(){
   this.productservice.removeproduct(this.newProduct.productId).subscribe();
  }

}
