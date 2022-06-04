import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.css']
})
export class OrderCheckoutComponent implements OnInit {

  shoppingCart : any;
  constructor( private cartService : CartService) { }

  ngOnInit(): void {
    this.getCartItems(1);
  }
  getCartItems(userId : number) {
    this.cartService.getCart(userId).subscribe((response : any) => {
      this.shoppingCart = response
    })
  }

}
