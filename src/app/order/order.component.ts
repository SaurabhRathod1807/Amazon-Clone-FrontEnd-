import { Component } from '@angular/core';
import { OrderService} from '../order.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orderitem: any;

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.showOrder();
  }

  showOrder() {
    let userId =sessionStorage.getItem("userId")?sessionStorage.getItem("userId"):null;

    this.orderService.show(userId).subscribe(
      (data:any) => {
        this.orderitem = data.list;
        this.orderitem.forEach(element => {
          element.quantity = this.getOrderById(element.productId);
        });
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  getOrderById(id){
    let orderQuantity;
    this.orderService.getorder(id).subscribe((data:any)=>{
      if(id==data.id){
        orderQuantity =data.quantity
      } 
    })
    return orderQuantity;
  }

  removeorder(productId:any){
    let userId=sessionStorage.getItem("userId")?sessionStorage.getItem("userId"): '';

    this.orderService.remove(userId,productId).subscribe(
      (Response : any)=>{
        this.showOrder();
        alert("Order Get Cancel")
      },
      (error)=>{
        console.log("Somting get Wrong.")
      }
    );
  }

  reload(){
    window.location.reload();
  }

}
