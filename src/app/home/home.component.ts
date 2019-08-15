import { Component, OnInit } from '@angular/core';
import { Okta } from '../auth/okta.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  user
  oktaObj;

  constructor(private okta: Okta){
    this.oktaObj = this.okta;
    this.oktaObj.isLoggedIn().then(res =>{
      this.user = res._links.user.name
      return this.user
  })}
  ngOnInit(){}
}
