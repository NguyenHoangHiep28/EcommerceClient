import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersUrl = "http://localhost:8080/api/v1/admin/orders";
  constructor(private httpClient : HttpClient) { }

  getOrders(filter : any) {
    return this.httpClient.post(this.ordersUrl, JSON.stringify(filter), {headers : {
        'Content-Type': 'application/json'
    }});
  }
}
