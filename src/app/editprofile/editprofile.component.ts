import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Student} from '../shared/models/student.model';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  menu_activated = false;
  edit_subpage = 0;

  newStudent: Student;

  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    if (this.auth.profileCompleted) {
      // todo
    } else {
      console.log('user data : ');
      console.log(this.auth.me);
      this.newStudent = this.auth.me;
    }
  }

  gotoLogin() {
    this.auth.redirectUrl = this.router.url;
    this.router.navigateByUrl('/login');
  }
}
