import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getMe(): Observable<Student> {
    return this.http.get<Student>(environment.apiUrl + '/common/me');
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.apiUrl + '/common/students');
  }

  getStudent(std_number: string): Observable<Student> {
    return this.http.get<Student>(environment.apiUrl + '/common/' + std_number);
  }

}
