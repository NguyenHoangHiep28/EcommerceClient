import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private url = "http://localhost:8081/api/v1/users/"
  constructor(private http: HttpClient) { }
  
  getProfile(userId : String){
    return this.http.get(this.url + userId);
  }

  updateProfile(updateObj : object) {
    return this.http.post(this.url + "update",updateObj, {headers : {
      'Content-Type': 'application/json'
    },observe:'response'})
  }
}
