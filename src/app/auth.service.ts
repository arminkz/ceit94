import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  redirectUrl = '';
  me: Student = null;

  apiUrl = 'https://api.staging.94.ceit.aut.ac.ir';

  windowHandle: any;
  intervalHandle: any;
  authorizationCode: string;
  intervalLen = 100;
  intervalCount = 100000;

  constructor(
    private router: Router,
    private http: HttpClient
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

  doAuthorization(authUrl: string) {
    /* Create the window object by passing url and optional window title */
    this.windowHandle = this.createOAuthWindow(authUrl, 'AUT OAuth');
    let loopCount = this.intervalCount;
    /* Now start the timer for which the window will stay, and after time over window will be closed */
    this.intervalHandle = window.setInterval(() => {
      if (loopCount-- < 0) {
        window.clearInterval(this.intervalHandle);
        this.windowHandle.close();
      } else {
        let href: string;
        // For referencing window url
        try {
          href = this.windowHandle.location.href; // set window location to href string
        } catch (e) {
          // console.log('Error:', e); // Handle any errors here
        }
        if (href != null) {
          // Method for getting query parameters from query string
          const getQueryString = function (field: any, url: string) {
            const windowLocationUrl = url ? url : href;
            const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
            const string = reg.exec(windowLocationUrl);
            return string ? string[1] : null;
          };
          /* As i was getting code and oauth-token i added for same, you can replace with your expected variables */
          if (href.match('code')) {
            window.clearInterval(this.intervalHandle);
            this.authorizationCode = getQueryString('code', href);
            console.log('auth code received : ' + this.authorizationCode);
            this.windowHandle.close();
            /* do rest of login process*/
          }
        }
      }
    }, this.intervalLen);
  }

  createOAuthWindow(url: string, name = 'Authorization', width = 400, height = 500, left = 0, top = 0) {
    if (url == null) {
      return null;
    }
    const options = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, name, options);
  }

  autOAuth() {
    console.log('connecting to aut ...')
    this.http.get(this.apiUrl + '/oauth/aut').subscribe(resp => {
      console.log(resp);
      this.doAuthorization('https://account.aut.ac.ir/api/oauth/authorize?client_id=' + resp['client_id'] +
        '&redirect_uri=' + resp['redirect_uri']);
    });    /*this.createOAuthWindow('https://account.aut.ac.ir/api/oauth/authorize?client_id='+ client_id
    + ');*/
  }


}
