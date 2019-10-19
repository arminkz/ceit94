import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vote} from './shared/models/vote.model';
import {Student} from './shared/models/student.model';
import {environment} from '../environments/environment';
import {HashtagModel} from './shared/models/hashtag.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) {}

  getVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(environment.apiUrl + '/tops');
  }

  deleteVote(voteID: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/tops/' + voteID);
  }

  submitVote(voteID: string, toUser: Student): Observable<any> {
    return this.http.post(environment.apiUrl + '/tops', {top_id: voteID, username: toUser.username});
  }

  getHashtags(username: string): Observable<HashtagModel[]> {
    return this.http.get<HashtagModel[]>(environment.apiUrl + '/tops/' + username);
  }

}
