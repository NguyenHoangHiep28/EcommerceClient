import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'http://localhost:8080/api/v1/users/products'
  constructor(private httpClient : HttpClient) { }
  getProducts(page : number, limit : number) {
    return this.httpClient.get(this.url + '?page=' + page + '&limit=' + limit)
  }
}
