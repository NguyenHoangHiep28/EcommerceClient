import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/user/services/authentication.service';
import { CartService } from 'src/app/user/services/cart.service';
import { DataSharingServiceService } from 'src/app/user/services/data-sharing-service.service';
import { TokenStorageServiceService } from 'src/app/user/services/token-storage-service.service';
import { UserProfileService } from 'src/app/user/services/user-profile.service';
const ACCESS_TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY =  'refresh-token';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = "";
  authenticated : string = "";
  shoppingCart:any = null;
  userId : number = 1;
  private updateSignal: Subscription;
  constructor(private cartService : CartService, 
    private dataSharingService : DataSharingServiceService, 
    private tokenService : TokenStorageServiceService, 
    private authenService : AuthenticationService,
    private userProfileService : UserProfileService) {
    this.updateSignal = this.dataSharingService.getUpdate().subscribe(res => {
      this.ngOnInit();
      // this.getCart();
      // this.dataSharingService.sendUpdate(false)
    });
  }

  ngOnInit(): void {
    let authenticatedUser = this.tokenService.getUser();
    this.getUserProfile();
    console.log(authenticatedUser)
    if(authenticatedUser){
      this.authenticated =  authenticatedUser;
      this.getCart();
    }
  }
  getCart() {
    this.cartService.getCart(this.userId).subscribe((response : any) => {
      this.shoppingCart = response;
    });
  }
  signOut() {
    this.tokenService.signOut();
    this.dataSharingService.sendUpdate(false)
    window.location.reload();
    this.authenService.doLogout(this.tokenService.getToken(REFRESH_TOKEN_KEY)).subscribe();
  }
  getUserProfile(){
    this.userProfileService.getProfile(this.tokenService.getUser()).subscribe((response:any) => {
      this.username = response.username;
    })
  }
  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.updateSignal.unsubscribe();
}

}
