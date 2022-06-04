import { Component, OnInit } from '@angular/core';
import { TokenStorageServiceService } from '../services/token-storage-service.service';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  profile : any;
  editable = false;
  username : string = "";
  
  constructor(private tokenService : TokenStorageServiceService, private userProfileService : UserProfileService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
     this.userProfileService.getProfile(this.tokenService.getUser()).subscribe((response:any) => {
      //  console.log(response.attributes)
      this.profile = {
        Address : response.attributes.Address[0],
        Avatar : response.attributes.Avatar[0],
        Dob : response.attributes.Dob[0],
        Email : response.attributes.Email[0],
        FirstName : response.attributes.FirstName[0],
        LastName : response.attributes.LastName[0],
        Phone : response.attributes.Phone[0]
      }
      this.username = response.username;
      console.log(this.profile)
    })
  }

  startEdit(){
    let input = window.document.getElementsByClassName("input");
    for(let i = 0; i < input.length; i++){
      input[i].classList.add("input-on");
    }
    this.editable = true;
  }
  cancelEdit(){
    let input = window.document.getElementsByClassName("input");
    for(let i = 0; i < input.length; i++){
      input[i].classList.remove("input-on");
    }
    this.editable = false;
    this.getProfile()
  }
  saveProfileUpdate(){
    let input = window.document.getElementsByClassName("input");
    for(let i = 0; i < input.length; i++){
      input[i].classList.remove("input-on");
    }
    this.editable = false;
    console.log(this.profile)
    let updateObj = {
      "userId" : this.tokenService.getUser(),
      "updateAttributes" : this.profile
    }
    this.userProfileService.updateProfile(updateObj).subscribe(response => {
      console.log(response)
    })
  }

}
