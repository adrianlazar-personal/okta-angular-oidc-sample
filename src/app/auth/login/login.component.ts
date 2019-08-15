import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Okta } from '../okta.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  oktaObj;
  oktaSignIn;
  constructor(private okta: Okta, private router: Router){
    this.oktaObj = this.okta
    this.oktaSignIn = this.oktaObj.getWidget();
  }

  ngOnInit(){
    this.oktaObj.isLoggedIn().then(active =>{
      if(active){
        var hash = window.location.hash
        var isCode = false;
        if(hash){
          isCode = true;
        }
        if(!isCode){
          const options = {
            issuer: 'https://adrian.oktapreview.com/oauth2/default',
            grantType: 'authorization_code'
          }
          this.oktaSignIn.authClient.options.issuer = options.issuer
          this.oktaSignIn.authClient.options.grantType = options.grantType
          console.log(this.oktaSignIn.authClient)
          this.oktaSignIn.authClient.token.getWithRedirect();
          //this.oktaAuth.token.getWithRedirect(oauthOptions)
        }else{
          console.log('nothing')
          /*
          this.oktaAuth.token.parseFromUrl().then(tokens => {
            tokens = Array.isArray(tokens) ? tokens : [tokens]
            tokens.forEach((token)=>{
              if(!token){
                console.error("No tokens")
                return;
              }else if(token.idToken){
                this.oktaAuth.tokenManager.add('idToken', token)
              }else if(token.accessToken){
                this.oktaAuth.tokenManager.add('accessToken', token)
              }
              return this.router.navigate(['']);
            })
          });*/
        }
      }else{
        this.oktaSignIn.renderEl({el:"#widget-container"},
          function success(res){
            if(res.status === 'SUCCESS'){
              res.session.setCookieRedirect('')
            }
          }
        )
    }})
  }
}