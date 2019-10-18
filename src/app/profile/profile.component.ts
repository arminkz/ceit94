import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../student.service';
import {Student} from '../shared/models/student.model';
import {AuthService} from '../auth.service';
import {environment} from '../../environments/environment';
import {debounceTime, delay} from 'rxjs/operators';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit , OnDestroy {

  isLoaded = false;
  menu_activated = false;

  interval: any;
  age_year: string;
  age_float: string;

  student: Student = new Student();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id).pipe(delay(1000))
      .subscribe(student => {
        this.student = student;
        this.isLoaded = true;
      });
    // Age counter
    this.interval = setInterval(() => {
      const age = (moment().unix() - this.student.birthday) / 31556926;
      const z = Math.floor(age);
      const q = age - z;
      this.age_year = String(z);
      this.age_float = String(q).substring(1, 9);
    }, 100);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setColorClass() {
    const classes = {
      c1: this.student.fav_color === 1,
      c2: this.student.fav_color === 2,
      c3: this.student.fav_color === 3,
      c4: this.student.fav_color === 4,
      c5: this.student.fav_color === 5,
      c6: this.student.fav_color === 6,
      c7: this.student.fav_color === 7,
      c8: this.student.fav_color === 8
    };

    return classes;
  }

  /*getStudentProfilePic(student: Student) {
    return environment.staticUrl + '/' + student.profile_pic;
  }*/

  gotoLogin() {
    this.auth.redirectUrl = this.router.url;
    this.router.navigateByUrl('/login');
  }

}
