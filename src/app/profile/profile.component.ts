import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../student.service';
import {Student} from '../shared/models/student.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
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

}
