import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageServiceService } from './token-storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  constructor(private jwtHelper: JwtHelperService, private tokenService : TokenStorageServiceService) { }
  public isAuthenticated(): boolean {
    const token = this.tokenService.getToken(TokenStorageServiceService.accessTokenKey);
    // Check whether the token is expired and return
    // true or false
    if(token){
      return !this.jwtHelper.isTokenExpired(token);
    }
  return false;
  }
}
