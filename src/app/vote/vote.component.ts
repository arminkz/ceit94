import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Vote} from '../shared/models/vote.model';
import {VoteService} from '../vote.service';
import {Student} from '../shared/models/student.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  isLoaded = false;
  menu_activated = false;

  votes: Vote[];
  selectedVote: Vote;

  constructor(public auth: AuthService,
              private voteService: VoteService) { }

  ngOnInit() {
    this.voteService.getVotes().subscribe( (resp) => {
      this.votes = resp;
      this.isLoaded = true;
    });
  }

  removeVote(vote: Vote) {
    this.voteService.deleteVote(vote.id).subscribe(() => {
      // update UI
      vote.voted_to = null;
    });
  }

  submitVote(s: Student) {
    this.voteService.submitVote(this.selectedVote.id,s).subscribe(() => {
      // update UI
      this.selectedVote.voted_to = s;
    });
  }

}
