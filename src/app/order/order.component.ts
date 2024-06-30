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
    this.showcart();
  }

  showcart() {
    let userId =sessionStorage.getItem("userId")?sessionStorage.getItem("userId"):null;

    this.orderService.show(userId).subscribe(
      (data:any) => {
        this.orderitem = data.list;
      },
      (error) => {
        console.error('Error fetching cart items', error);
      }
    );
  }
}
