import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  redirectUrl = '';
  me: Student = null;

  constructor(
    private router: Router
  ) { }

  login() {
    this.isAuthenticated = true;
    this.me = {username: 'arminkz', fname: 'آرمین', lname: 'کاظمی', profile_pic: '../../assets/armin2.jpg', fav_color: 1};
    if (this.redirectUrl !== '') {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getMe(): Student {
    return this.me;
  }
}
