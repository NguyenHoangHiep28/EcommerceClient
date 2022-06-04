import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { DataSharingServiceService } from '../services/data-sharing-service.service';
import { TokenStorageServiceService } from '../services/token-storage-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId : number = this.tokenService.getUser();
  shoppingCart : any;
  constructor(private service : CartService, private shareDataService : DataSharingServiceService, private tokenService : TokenStorageServiceService) { }

  ngOnInit(): void {
    this.getCart();
  }
  getCart(){
    this.service.getCart(this.userId).subscribe((response : any) => {
      this.shoppingCart = response;
    });
  }
  removeFromCart(cartItemId : object) {
    console.log(cartItemId);
    this.service.removeFromCart(cartItemId).subscribe(response => {
      this.getCart();
this.sendUpdateSignal();
    })
  }
sendUpdateSignal(): void {
            this.shareDataService.sendUpdate(true);
        }
  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
