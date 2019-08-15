import { Injectable } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';
import * as OktaAuth from '@okta/okta-auth-js';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Okta {
  widget;
  //authClient;
  config;
  constructor() { }
  getWidget(){
    if (!this.widget){
      const config = {
        baseUrl: environment.BASE_URL,
        clientId: environment.CLIENT_ID,
        redirectUri: environment.REDIRECT_URL,
        authParams: {
          issuer: 'https://adrian.oktapreview.com/oauth2/default',
          display: 'page',
          responseType:'code',
          authorizeUrl:'https://adrian.oktapreview.com/oauth2/default/v1/authorize'
        },
        features: {
          autoPush:true,
          multiOptionalFactorEnroll:true
        }
      }
      this.widget = new OktaSignIn(config);
    }
    return this.widget;
  }
  getConfig(){
    this.config = {
      baseUrl: environment.BASE_URL,
      clientId: environment.CLIENT_ID,
      redirectUri: environment.REDIRECT_URL,
      authParams:{
        display: 'page',
        issuer: 'default',
        responseType:'code',
        responseMode: 'fragment'
      }
    }
    return this.config;
  }
  //handleLogin(sessionToken){
    //const options = this.getOauthOptions(sessionToken)
    //const authClient = this.getAuthClient(options)
   // return authClient.token.getWithRedirect()
 // }
  oauthOptions(sessionToken=''){
    const OauthOptions = {
      grantType: 'authorization_code',
      responseType: 'code',
      responseMode: 'fragment',
      state: 'TESTINPULAMEA',
      sessionToken: sessionToken
    }
    return OauthOptions;
  }
  /*
  getOauthOptions2(){
    const OauthOptions = {
      url: environment.BASE_URL,
      issuer: environment.ISSUER,
      clientId: environment.CLIENT_ID,
      redirectUri: environment.REDIRECT_URL,
      grantType: 'authorization_code',
      responseMode: 'fragment'
    }
    return OauthOptions;
  }*/
  /*
  getAuthClient(options={}){
    if (!this.authClient){
      this.authClient = new OktaAuth( options || this.getOauthOptions())
    }
    return this.authClient;
  }*/

  async isLoggedIn(){
    var getsession = await fetch(environment.BASE_URL+'/api/v1/sessions/me', {
      method: 'GET',
      mode:'cors',
      credentials: 'include'
    })
    var session = await getsession.json()
    if(session.status === 'ACTIVE'){
      return session;
    }else{
      return false;
    }
  }
  /*
  async handleAuth(){
    this.authClient = new OktaAuth(this.getOauthOptions())
    let tokens = this.authClient.token.parseFromUrl().then(res => console.log(res))
    console.log(tokens);
  }*/
  /*
  async getUser(){
    this.authClient = new OktaAuth(this.getOauthOptions())
    const accessToken = await this.authClient.tokenManager.get('accessToken')
    const idToken = await this.authClient.tokenManager.get('idToken')
    if(accessToken){
      const user = await this.authClient.token.getUserInfo(accessToken);
      return {user, accessToken, idToken}
    }
  }*/
}
