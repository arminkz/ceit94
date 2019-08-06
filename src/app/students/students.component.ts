import { Component, OnInit } from '@angular/core';
import {Student} from '../shared/models/student.model';
import {StudentService} from '../student.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: Student[];
  searchText: string;

  constructor(
    private studentService: StudentService,
    private router: Router
    ) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

  clickedStudent(student: Student) {
    this.router.navigateByUrl('/' + student.username);
  }

}
