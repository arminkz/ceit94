import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../models/student.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() title = '';
  @Input() topNav = true;
  @Input() topButton = false;

  me: Student;

  constructor(public auth: AuthService,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.profileService.getProfile().subscribe(resp => this.me = resp);
    }
  }
}
