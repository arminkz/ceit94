import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [
    {id: 9431068, fname: 'آرمین', lname: 'کاظمی', profile_pic: '../../assets/armin2.jpg'},
    {id: 9431067, fname: 'عادل', lname: 'قایینیان', profile_pic: '../../assets/adel.jpg'},
    {id: 9431066, fname: 'علیرضا', lname: 'حیدری', profile_pic: '../../assets/AH.jpg'},
    {id: 9431065, fname: 'مهرداد', lname: 'جابری', profile_pic: '../../assets/mehrdad.jpg'},
    {id: 9431064, fname: 'احمد', lname: 'انواری'},
    {id: 9431063, fname: 'دونالد', lname: 'ترامپ', profile_pic: '../../assets/trump.png'},
    {id: 9431063, fname: 'بروس', lname: 'لی', profile_pic: '../../assets/brucelee.png'},
    {id: 9431063, fname: 'بریتنی', lname: 'اسپییرز', profile_pic: '../../assets/britney.png'},
  ];

  constructor() {}

  getStudents() {
    return this.students;
  }

}
