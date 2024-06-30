import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cart, CartService } from '../cart.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService} from '../order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartitem:any= [];
  successMessage:any
  errorMessage:any;
  viewCartProductDetails:boolean = false;
  constructor(private cartservice: CartService,private orderService:OrderService, private router:Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.showcart();
  }

  showcart() {
    let userId =sessionStorage.getItem("userId")?sessionStorage.getItem("userId"):null;

    this.cartservice.show(userId).subscribe(
      (data:any) => {
        this.cartitem = data.list;
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }


  addToOrder(productId: string) {
    // let users= userId:
    // const newCartItem = new Cart(sessionStorage.getItem("userId"), productId);

    this.orderService.add({userId:sessionStorage.getItem("userId"),productId:productId}).subscribe(
      (response: any) => {
        console.log('Item added to cart', response);
        this.showcart();
        alert("Iteam order successfully");

      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }

  removeItem(productId:string){
    let userId =sessionStorage.getItem("userId")?sessionStorage.getItem("userId"):'';
    this.cartservice.removeproduct(userId,productId).subscribe(
      (response: any) => {
        console.log('Item added to cart', response);
        this.router.navigate(['/cart']);
        // window.location.reload();
        this.showcart();
        alert("Iteam remove successfully");
      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }

  reloadpage(){
    window.location.reload();
  }

  // removeItem(productId: string) {
  //   let userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : '';
  //   this.cartservice.removeproduct(userId, productId).subscribe(
  //     (response: any) => {
  //       console.log('Item removed from cart', response);
  //       // Remove the item from the local cartitem array
  //       this.cartitem = this.cartitem.filter((item: { productId: string }) => item.productId !== productId);
        
  //       // Force change detection
  //       this.cdr.detectChanges();
        
  //       // Navigate to the same route to refresh the page
  //       this.router.navigateByUrl('/cart', { skipLocationChange: true }).then(() => {
  //         this.router.navigate(['cart']);
  //       });
  //     },
  //     (error) => {
  //       console.error('Error removing item from cart', error);
  //     }
  //   );
  // }
  
}
