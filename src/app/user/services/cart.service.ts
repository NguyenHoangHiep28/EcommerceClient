import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = 'http://localhost:8080/api/v1/users/carts'
  constructor(private httpClient : HttpClient) { }
  getCart(userId : number){
    return this.httpClient.get(this.url + "?userId=" + userId);
  }
  addToCart(cartItem : object) {
    return this.httpClient.post(this.url, JSON.stringify(cartItem), {headers : {
      'Content-Type': 'application/json'
   }});
  }
  removeFromCart(cartItem : object) {
    return this.httpClient.post(this.url + "/delete", JSON.stringify(cartItem), {headers : {
      'Content-Type': 'application/json'
   }});
  }
}
