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
  prodQuant:any = 1;
  price:any;
  totalPrice = 0 ;
  constructor(private cartservice: CartService,private orderService:OrderService, private router:Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.showcart();
  }

  // showcart() {
  //   let userId =sessionStorage.getItem("userId")?sessionStorage.getItem("userId"):null;
  //   this.cartitem =[];
  //   this.cartservice.show(userId).subscribe(
  //     (data:any) => {
  //       data.list.forEach(element => {
  //         element.quant= 1;
  //         element.finalPrice = element.price;
  //         this.totalPrice +=element.price;
  //       });
  //       this.cartitem = data.list;
  //     }
  //   );
  // }

  showcart() {
    let userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : null;
    this.cartservice.show(userId).subscribe(
      (data: any) => {
        this.cartitem = data.list.map(element => ({
          ...element,
          quant: 1,
          finalPrice: element.price
        }));
        this.calculateTotalPrice();
      }
    );
  }

  // calculateTotalPrice() {
  //   this.totalPrice = this.cartitem.reduce((total, item) => total + (item.finalPrice * item.quant), 0);
  // }

  calculateTotalPrice() {
    this.totalPrice = this.cartitem.reduce((total, item) => total + item.finalPrice, 0);
  }
  

  addToOrder(productId:string,quant:any) {
    // let users= userId:
    // const newCartItem = new Cart(sessionStorage.getItem("userId"), productId);

    this.orderService.add({userId:sessionStorage.getItem("userId"),productId:productId,quantity:quant}).subscribe(
      (response: any) => {
        console.log('Item added to cart', response);
        this.showcart();
        this.loadOrders();
        alert("Iteam order successfully");

      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }

  // removeItem(productId:string){
  //   let userId =sessionStorage.getItem("userId")?sessionStorage.getItem("userId"):'';
  //   this.cartservice.removeproduct(userId,productId).subscribe(
  //     (response: any) => {
  //       console.log('Item added to cart', response);
  //       // this.router.navigate(['/cart']);
  //       // window.location.reload();
  //       this.showcart();
  //       alert("Iteam remove successfully");
  //     },
  //     (error) => {
  //       console.error('Error adding item to cart', error);
  //     }
  //   );
  // }

  removeItem(productId: string) {
    let userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : '';
    this.cartservice.removeproduct(userId, productId).subscribe(
      (response: any) => {
        console.log('Item removed from cart', response);
        // Remove the item from the local cartitem array
        this.cartitem = this.cartitem.filter((item: { productId: string }) => item.productId !== productId);
        // Update total price
        this.calculateTotalPrice();
        // Optional: Force change detection if necessary
        this.cdr.detectChanges();
        alert("Item removed successfully");
      },
      (error) => {
        console.error('Error removing item from cart', error);
      }
    );
  }

  reloadpage(){
    window.location.reload();
  }

  // addQuantity(productId:any,quant,price){
  //   let quants = quant + 1;
  //   this.cartitem.forEach(element => {
  //     if(element.productId == productId){
  //       element.quant = quants;
  //       element.finalPrice = this.priceQuant(quant,price)
  //     }
  //   });
  // }
  // addQuantity(productId: string, quant: number, price: number) {
  //   quant++;
  //   this.updateCartItem(productId, quant, price);
  // }

  priceQuant(quant, price){
    return quant*price;
  }

  // removeQuantity(productId:any,quant,price){
  //   let quants = quant - 1;

  //   this.cartitem.forEach(element => {
  //     if(element.productId == productId){
  //       element.quant = quants;
  //       element.finalPrice = this.priceQuant(quant,price)
  //     }
  //   });
  //   if(this.prodQuant == 0){
  //     this.removeItem(productId);
  //   }
  // }

  // removeQuantity(productId: string, quant: number, price: number) {
  //   if (quant > 1) {
  //     quant--;
  //     this.updateCartItem(productId, quant, price);
  //   }
  // }

//   updateCartItem(productId: string, quant: number, price: number) {
//     this.cartitem = this.cartitem.map(item => {
//       if (item.productId === productId) {
//         return {
//           ...item,
//           quant,
//           finalPrice: quant * price
//         };
//       }
//       return item;
//     });
//     this.calculateTotalPrice();
//   }
// }

loadOrders() {
  // Assuming you have an endpoint or method to load order items for the current user
  this.orderService.show(sessionStorage.getItem("userId")).subscribe(
    (data: any) => {
      this.cartitem = data.list.map(element => ({
        ...element,
        quant: element.quantity, 
        finalPrice: element.price * element.quantity 
      }));
    },
    (error) => {
      console.error('Error loading orders', error);
    }
  );
}


addQuantity(index: number, productId) {
  this.cartitem[index].quant++;
  this.cartitem[index].finalPrice = this.cartitem[index].quant * this.cartitem[index].price;
  this.calculateTotalPrice();
}

// removeQuantity(index: number, productId) {
//   if (this.cartitem[index].quant > 1) {
//     this.cartitem[index].quant--;
//     this.cartitem[index].finalPrice = this.cartitem[index].quant * this.cartitem[index].price;
//   } else if (this.cartitem[index].quant === 1) {
//     this.cartitem[index].quant--;
//     this.removeItem(productId);
//   }
//   this.calculateTotalPrice();
// }

removeQuantity(index: number, productId: string) {
  if (this.cartitem[index].quant > 1) {
    // Decrease the quantity and update the final price
    this.cartitem[index].quant--;
    this.cartitem[index].finalPrice = this.cartitem[index].quant * this.cartitem[index].price;
  } else if (this.cartitem[index].quant === 1) {
    // Set quantity to 0 and remove the item from the cart
    this.cartitem[index].quant = 0;
    this.removeItem(productId); 
    window.location.reload();
    
  }
  // Recalculate the total price
  this.calculateTotalPrice();
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
