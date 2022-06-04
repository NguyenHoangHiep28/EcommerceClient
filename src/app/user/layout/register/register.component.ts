import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/user/services/authentication.service';
import { DataSharingServiceService } from 'src/app/user/services/data-sharing-service.service';
import { TokenStorageServiceService } from 'src/app/user/services/token-storage-service.service';
const ACCESS_TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY =  'refresh-token';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usernameValid = false;
  passwordMatch = false;
  username : string = "";
  password : string = "";
  confirmPassword : string = "";
  constructor(private authenService : AuthenticationService, private tokenService : TokenStorageServiceService, private dataSharingService : DataSharingServiceService, private router: Router) {
   }

  ngOnInit(): void {
  }
  checkpassword() {
    console.log("check password = " + this.passwordMatch)
    console.log(this.username);
    console.log(this.password)
    console.log(this.confirmPassword)
    if(this.password == this.confirmPassword){
      this.passwordMatch = true;
    }
  }
  register() {
    if(this.username.length > 0) {
      this.usernameValid = true;
    }else{
      this.usernameValid = false;
    }
    if(this.usernameValid && this.passwordMatch) {
      let registerObj = {
        username : this.username,
        password : this.password
      }
      this.authenService.doRegister(registerObj).subscribe((response:any)=> {
        let responseBody = response.body;
        this.tokenService.saveAcessToken(ACCESS_TOKEN_KEY,ACCESS_TOKEN_KEY,responseBody.access_token);
            this.tokenService.saveAcessToken(REFRESH_TOKEN_KEY, REFRESH_TOKEN_KEY, responseBody.refresh_token);
            this.tokenService.saveUser(responseBody.userId);
            this.dataSharingService.sendUpdate(true);
            this.router.navigate(['/account'])
      }, err => {
        // this.errorStr = err.error.error
        console.log(err);
      })
    }
  }

}
