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

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.apiUrl + '/students');
  }

  getStudent(username: string): Observable<Student> {
    return this.http.get<Student>(environment.apiUrl + '/students/' + username);
  }

}
