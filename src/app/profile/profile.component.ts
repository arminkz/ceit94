import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../student.service';
import {Student} from '../shared/models/student.model';
import {CommentModel} from '../shared/models/comment.model';
import {AuthService} from '../auth.service';
import {environment} from '../../environments/environment';
import {debounceTime, delay} from 'rxjs/operators';
import * as moment from 'jalali-moment';
import {ProfileService} from '../profile.service';
import {HashtagModel} from '../shared/models/hashtag.model';
import {VoteService} from '../vote.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit , OnDestroy {

  titlePasser = '';
  isLoaded = false;

  interval: any;
  age_year: string;
  age_float: string;

  student: Student = new Student();
  comments: CommentModel[] = [];
  hashtags: HashtagModel[];

  me: Student = new Student();
  commentText: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private voteService: VoteService,
    private profileService: ProfileService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(student => {
        this.student = student;
        this.titlePasser = this.student.firstname + ' ' + this.student.lastname;
        this.isLoaded = true;
      });

    this.studentService.getComments(id)
      .subscribe(resp => {
        console.log('got comments');
        this.comments = resp;
      });

    this.voteService.getHashtags(id)
      .subscribe(resp => {
        console.log('got hashtags');
        this.hashtags = resp;
      });

    if (this.auth.isLoggedIn()) {
      this.profileService.getProfile()
        .subscribe(resp => {
          this.me = resp;
        });
    }

    // Age counter
    this.interval = setInterval(() => {
      const age = (moment().unix() - this.student.birthday) / 31556926;
      const z = Math.floor(age);
      const q = age - z;
      this.age_year = String(z);
      this.age_float = String(q).substring(1, 9);
    }, 100);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setColorClass() {
    const classes = {
      c1: this.student.fav_color === 1,
      c2: this.student.fav_color === 2,
      c3: this.student.fav_color === 3,
      c4: this.student.fav_color === 4,
      c5: this.student.fav_color === 5,
      c6: this.student.fav_color === 6,
      c7: this.student.fav_color === 7,
      c8: this.student.fav_color === 8
    };

    return classes;
  }

  sendComment(str: string) {
    this.studentService.sendComment(this.student.username, str)
      .subscribe(() => {
        // reload comments
        this.studentService.getComments(this.student.username)
          .subscribe(resp => {
            this.comments = resp;
          });
        // clear textarea
        this.commentText = '';
      });
  }

}
