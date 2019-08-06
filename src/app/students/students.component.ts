import { Component, OnInit } from '@angular/core';
import {Student} from '../shared/models/student.model';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getStudents();
  }

}
