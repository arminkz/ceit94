import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[] = [
    {id: 9431068, fname: 'آرمین', lname: 'کاظمی'},
    {id: 9431067, fname: 'عادل', lname: 'قایینیان'},
    {id: 9431066, fname: 'علیرضا', lname: 'حیدری'},
    {id: 9431065, fname: 'مهرداد', lname: 'جابری'},
    {id: 9431064, fname: 'احمد', lname: 'انواری'},
    {id: 9431063, fname: 'دونالد', lname: 'ترامپ'},
  ];

  constructor() {}

  getStudents() {
    return this.students;
  }

}
