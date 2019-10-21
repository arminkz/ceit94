import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Student} from '../../models/student.model';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SideMenuComponent implements OnInit {

  menu_activated = false;

  me: Student;

  constructor(public auth: AuthService,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.profileService.getProfile().subscribe(resp => this.me = resp);
    }
  }

  gotoLogin() {
    this.auth.redirectUrl = this.router.url;
    this.router.navigateByUrl('/login');
  }

  toggle() {
    this.menu_activated = !this.menu_activated;
  }

}
