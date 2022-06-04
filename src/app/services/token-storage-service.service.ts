import { Injectable } from '@angular/core';
const AUTHENTICATED_USERID_KEY = 'authenticated_user_id';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {
  public static accessTokenKey = "access-token";
  public static refreshTokenKey = "refresh-token";
  constructor() { }
  signOut () : void {
    window.sessionStorage.clear();
  }
  public saveAcessToken(oldTokenKey : string, newTokenKey :string ,token : string) : void {
    window.sessionStorage.removeItem(oldTokenKey);
    window.sessionStorage.setItem(newTokenKey, token);
  }
  public getToken(tokenKey : string): string | null {
    return window.sessionStorage.getItem(tokenKey);
  }
  public saveUser (userId: any ) :void {
    window.sessionStorage.removeItem(AUTHENTICATED_USERID_KEY);
    window.sessionStorage.setItem(AUTHENTICATED_USERID_KEY, userId);
  }
  public getUser(): any {
    const userId = window.sessionStorage.getItem(AUTHENTICATED_USERID_KEY);
    return userId;
  }
}
