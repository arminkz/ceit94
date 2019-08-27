import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_subpage = 0;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  login() {
   // this.auth.login();
  }

  register() {
    this.login_subpage = 3;
    this.auth.autOAuth();
  }
}
