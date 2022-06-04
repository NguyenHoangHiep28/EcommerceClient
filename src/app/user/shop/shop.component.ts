import {Component, OnInit} from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { DataSharingServiceService } from '../services/data-sharing-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products : any;
  p : number = 1;
  total : number = 0;

  showOptions : any[] = [
    {showTitle : "Show : 3", showValue: 3},
    {showTitle : "Show : 6", showValue: 6},
    {showTitle : "Show : 9", showValue: 9}
  ];
  filter : any = {
    show : 3,
    sortBy : "latest"
  }
  itemsPerPage : number = this.filter.show;
  constructor(private service : ProductsService, private cartService : CartService, private dataSharingService : DataSharingServiceService) {
  }
  ngOnInit(): void {
    this.loadJsFile("../../assets/front/js/main.js")
    this.getProducts();
    
  }
  onSubmit(sortAndShow: NgForm) {
    this.itemsPerPage = sortAndShow.value.show;
    this.p = 1
    this.getProducts();
  }
  getProducts() {
    this.service.getProducts(this.p, this.filter.show).subscribe((response : any) => {
      this.products = response.content;
      this.total = response.totalElements;
    })
  }

  pageChangeEvent(event: number){
    this.p = event;
    console.log(this.p);
    this.getProducts();
  }
  addToCart(productId : number) {
    let cartItem = {
      productId : productId,
      userId : 1,
      quantity : 1
    }
    this.cartService.addToCart(cartItem).subscribe((reponse : any) => {
      alert("Product is added to cart successfully!")
    });
    this.sendUpdateSignal();
  }
  sendUpdateSignal(): void {
    this.dataSharingService.sendUpdate(true);
}
  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
