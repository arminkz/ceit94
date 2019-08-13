import {Component, OnInit} from '@angular/core';
import {Student} from '../shared/models/student.model';
import {StudentService} from '../student.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  menu_activated = false;

  students: Student[];
  searchText: string;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

  clickedStudent(student: Student) {
    this.router.navigateByUrl('/' + student.username);
  }

  getStudentColorClass(student: Student) {
    const classes = {
      c1: student.fav_color === 1,
      c2: student.fav_color === 2,
      c3: student.fav_color === 3,
      c4: student.fav_color === 4,
      c5: student.fav_color === 5,
      c6: student.fav_color === 6,
      c7: student.fav_color === 7,
      c8: student.fav_color === 8
    };
    return classes;
  }

  gotoLogin() {
    this.auth.redirectUrl = this.router.url;
    this.router.navigateByUrl('/login');
  }
}
