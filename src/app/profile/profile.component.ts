import { Component, OnInit } from '@angular/core';
import { Okta } from '../auth/okta.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
export class ProfileComponent implements OnInit {
    user = {
      accessToken: '',
      idToken: '',
      claims: {}
    };
    oktaObj;
    constructor(private okta: Okta){
      this.oktaObj = this.okta
      this.oktaObj.getUser().then(res =>{
        this.user.accessToken = res.accessToken
        this.user.idToken = res.idToken
        this.user.claims = res.user
        console.log(this.user)
      })
    }
    ngOnInit(){
    }
}
