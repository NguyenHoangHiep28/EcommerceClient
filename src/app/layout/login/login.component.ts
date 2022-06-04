import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataSharingServiceService } from 'src/app/services/data-sharing-service.service';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
const ACCESS_TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY =  'refresh-token';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorStr = ""
  loginObj =  {
    username : "",
    password : ""
  }
  returnUrl: string;
  constructor(private loginService : AuthenticationService,
     private tokenService : TokenStorageServiceService,
      private router : Router,
      private dataSharingService : DataSharingServiceService,
      private route : ActivatedRoute) {
        this.tokenService.signOut();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
       }

  ngOnInit(): void {
  }

  doLogin() {
    console.log(this.loginObj)
    this.loginService.doLogin(this.loginObj).subscribe((response : any) => {
        let responseBody = response.body;
        // if(responseBody){
          this.tokenService.saveAcessToken(ACCESS_TOKEN_KEY,ACCESS_TOKEN_KEY,responseBody.access_token);
          this.tokenService.saveAcessToken(REFRESH_TOKEN_KEY, REFRESH_TOKEN_KEY, responseBody.refresh_token);
          this.tokenService.saveUser(responseBody.userId);
          this.dataSharingService.sendUpdate(true);
          this.router.navigate(['/account'])
          // this.router.navigateByUrl(this.returnUrl);
        // }
    }, err => {
      // this.errorStr = err.error.error
      console.log(err);
      this.loginObj.password = ""
      this.errorStr = "User name or password does not match!";
    })
  }
}
