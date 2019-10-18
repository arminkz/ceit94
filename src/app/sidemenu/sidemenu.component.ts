import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Student} from '../shared/models/student.model';
import {ProfileService} from '../profile.service';

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

  me: Student;

  constructor(public auth: AuthService,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(resp => this.me = resp);
  }

  gotoLogin() {
    this.auth.redirectUrl = this.router.url;
    this.router.navigateByUrl('/login');
  }

}
