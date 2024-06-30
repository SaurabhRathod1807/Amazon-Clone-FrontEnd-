import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../product.service';
import { CartService} from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
product:Product[]=[];
newProduct: Product = new Product('', '', 0, 0, ''); 
selectedProduct: Product | null = null;

constructor(private productservice:ProductService, private cartService: CartService,private router:Router){}
  ngOnInit(): void {
    
    this.getallproduct();
  }

  getallproduct(){
    this.productservice.getallproduct().subscribe((data: Product[]) => {
      this.product=data;
    },
  (error) => {
    console.error('Error fetching Product' , error);
  });
  }

  // saveProduct() {
  //   this.productservice.saveproduct(this.newProduct).subscribe(
  //     (response: any) => {
  //       console.log('Product saved successfully', response);
  //       this.getallproduct();
  //       this.newProduct = new Product('', '', 0, 0, '');
  //     },
  //     (error) => {
  //       console.error('Error saving product', error);
  //     }
  //   );
  // }

  addToCart(product:any){
    this.cartService.add({userId:sessionStorage.getItem("userId"),productId:product.productId}).subscribe((res:any)=>{
      console.log(res);
      alert("Iteam Added successfully");
      
    })
  }

  

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  updateProduct() {
    if (this.selectedProduct) {
      this.productservice.updateproduct(this.selectedProduct.productId ).subscribe(
        (response: any) => {
          console.log('Product updated successfully', response);
          this.getallproduct(); 
          this.selectedProduct = null;
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    }
  }

}


