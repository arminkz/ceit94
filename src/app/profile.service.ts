import { Injectable } from '@angular/core';
import {Student} from './shared/models/student.model';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Student> {
    return this.http.get<Student>(environment.apiUrl + '/profile');
  }

  setProfilePic(pic: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', pic);
    return this.http.post(environment.apiUrl + '/profile/avatar', formData);
  }

  setProfile(student: Student): Observable<any> {
    return this.http.post(environment.apiUrl + '/profile', student);
  }

}
