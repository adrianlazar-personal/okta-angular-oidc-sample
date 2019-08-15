import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Okta } from './okta.service';
@Injectable()
export class LoggedInGuard implements CanActivate {
  session
  constructor(private oktaSignIn: Okta, private router: Router) {}
canActivate(): Observable<boolean> | Promise<boolean> | boolean {
     return this.session = this.oktaSignIn.isLoggedIn().then(exists => {
        if(!exists) {
          this.router.navigate(['login']);
          return false;
        }
          return true;
      })
    }
}