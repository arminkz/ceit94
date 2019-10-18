import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() title = '';
  @Input() topNav = true;
  @Input() topButton = false;
  menu_activated = false;

  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  gotoLogin() {
    this.auth.redirectUrl = this.router.url;
    this.router.navigateByUrl('/login');
  }

}
