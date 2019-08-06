import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [
    {username: 'arminkz', fname: 'آرمین', lname: 'کاظمی', profile_pic: '../../assets/armin2.jpg', link_github: 'https://github.com/arminkz'
    , link_instagram: 'https://www.instagram.com/arminkz/', link_twitter: 'https://twitter.com/arminkz'},
    {username: 'adel', fname: 'عادل', lname: 'قایینیان', profile_pic: '../../assets/adel.jpg'},
    {username: 'heydari', fname: 'علیرضا', lname: 'حیدری', profile_pic: '../../assets/AH.jpg'},
    {username: 'mehrdad', fname: 'مهرداد', lname: 'جابری', profile_pic: '../../assets/mehrdad.jpg'},
    {username: 'anvari', fname: 'احمد', lname: 'انواری'},
    {username: 'trump', fname: 'دونالد', lname: 'ترامپ', profile_pic: '../../assets/trump.png'},
    {username: 'lee', fname: 'بروس', lname: 'لی', profile_pic: '../../assets/brucelee.png'},
    {username: 'britney', fname: 'بریتنی', lname: 'اسپییرز', profile_pic: '../../assets/britney.png'},
  ];

  constructor() {}

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }

  getStudent(username: string): Observable<Student> {
    return of(this.students.find(s => s.username === username));
  }

}
