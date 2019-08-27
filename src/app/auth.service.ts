import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl = '';
  me: Student = null;
  profileCompleted: boolean;

  apiUrl = 'https://api.staging.94.ceit.aut.ac.ir';

  windowHandle: any;
  intervalHandle: any;
  intervalLen = 100;
  intervalCount = 2000;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(authCode: string) {
    this.http.post(this.apiUrl + '/oauth/aut/login', {code: authCode}).subscribe(resp => {
      console.log(resp);
      localStorage.setItem('token', resp['token']);
      localStorage.setItem('token_expire', String(moment().add(24, 'hours').unix()));
      console.log('isLoggedIn() :' + this.isLoggedIn());
      this.me = resp['user'];
      localStorage.setItem('user' , JSON.stringify(resp['user']));
      this.profileCompleted = resp['profileCompeleted'];
      if (this.profileCompleted) {
        // redirect back
        if (this.redirectUrl === '') {
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl(this.redirectUrl);
        }
      } else {
        // go to edit profile
        this.router.navigateByUrl('/edit');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expire');
    localStorage.removeItem('user');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
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
        console.log('waiting...');
        let href: string;
        // For referencing window url
        try {
          href = this.windowHandle.location.href; // set window location to href string
        } catch (e) {
          // console.log('Error:', e); // CORS Errors will catch here
        }
        if (href != null) {
          // Method for getting query parameters from query string
          const getQueryString = function (field: any, url: string) {
            const windowLocationUrl = url ? url : href;
            const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
            const string = reg.exec(windowLocationUrl);
            return string ? string[1] : null;
          };
          if (href.match('code')) {
            window.clearInterval(this.intervalHandle);
            const authCode = getQueryString('code', href);
            console.log('auth code received : ' + authCode);
            this.windowHandle.close();
            /* do rest of login process*/
            this.login(authCode);
          }
        }
      }
    }, this.intervalLen);
  }

  createOAuthWindow(url: string, name = 'Authorization', width = 400, height = 400, left = 0, top = 0) {
    if (url == null) {
      return null;
    }
    const options = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, name, options);
  }

  autOAuth() {
    this.http.get(this.apiUrl + '/oauth/aut').subscribe(resp => {
      this.doAuthorization('https://account.aut.ac.ir/api/oauth/authorize?client_id=' + resp['client_id'] +
        '&redirect_uri=' + resp['redirect_uri']);
    });
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getExpiration() {
    const expiration = localStorage.getItem('token_expire');
    const expiresAt = JSON.parse(expiration);
    return moment.unix(expiresAt);
  }

}
