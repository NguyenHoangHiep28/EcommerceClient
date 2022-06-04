import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private brandUrl = "http://localhost:8080/api/v1/brands"
  private categoriesUrl = "http://localhost:8080/api/v1/categories";
  constructor(private httpClient : HttpClient) { }

  getCategories() {
    return this.httpClient.get(this.categoriesUrl);
  }
  getBrands() {
    return this.httpClient.get(this.brandUrl);
  }
}
