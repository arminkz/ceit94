import { Injectable } from '@angular/core';
import {Student} from '../models/student.model';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommentModel} from '../models/comment.model';

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

  getComments(username: string): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(environment.apiUrl + '/students/' + username + '/comments');
  }

  sendComment(username: string, text: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/students/' + username + '/comments', {text: text});
  }

  deleteComment(username: string, comment_id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/students/' + username + '/comments/' + comment_id);
  }

}
