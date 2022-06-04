import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = 'http://localhost:8081/api/v1/login'
  private registerUrl = 'http://localhost:8081/api/v1/register'
  private logoutUrl = "http://localhost:8081/api/v1/logout"
  constructor(private http : HttpClient) { }
  doLogin(credentials : object){
    return this.http.post(`${this.loginUrl}`,JSON.stringify(credentials),{headers : {
      'Content-Type': 'application/json'
  },observe:'response'});
  }

  doRegister(credentials : object){
    return this.http.post(this.registerUrl, JSON.stringify(credentials),{headers : {
      'Content-Type': 'application/json'
    },observe:'response'});
  }

  doLogout(refreshToken : String | null){
    return this.http.post(this.logoutUrl, JSON.stringify(refreshToken), {headers : {
      'Content-Type': 'application/json'
    }})

  }

}
