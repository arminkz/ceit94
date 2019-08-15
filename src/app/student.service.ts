import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [
    {username: 'arminkz', fname: 'آرمین', lname: 'کاظمی', profile_pic: '../../assets/armin2.jpg', link_github: 'https://github.com/arminkz'
    , link_instagram: 'https://www.instagram.com/arminkz/', link_twitter: 'https://twitter.com/arminkz', fav_color: 1},
    {username: 'adel', fname: 'عادل', lname: 'قایینیان', profile_pic: '../../assets/adel.jpg', fav_color: 2},
    {username: 'heydari', fname: 'علیرضا', lname: 'حیدری', profile_pic: '../../assets/AH.jpg', fav_color: 3},
    {username: 'mehrdad', fname: 'مهرداد', lname: 'جابری', profile_pic: '../../assets/mehrdad.jpg', fav_color: 4},
    {username: 'anvari', fname: 'احمد', lname: 'انواری', fav_color: 5},
    {username: 'trump', fname: 'دونالد', lname: 'ترامپ', profile_pic: '../../assets/trump.png', fav_color: 6},
    {username: 'lee', fname: 'بروس', lname: 'لی', profile_pic: '../../assets/brucelee.png', fav_color: 7},
    {username: 'britney', fname: 'بریتنی', lname: 'اسپییرز', profile_pic: '../../assets/britney.png', fav_color: 8},
  ];

  constructor() {}

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }

  getStudent(username: string): Observable<Student> {
    return of(this.students.find(s => s.username === username));
  }

}
