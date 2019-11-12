import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Vote} from '../../models/vote.model';
import {VoteService} from '../../services/vote.service';
import {Student} from '../../models/student.model';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageCropComponent} from '../imagecrop/imagecrop.component';
import {UserSearchComponent} from '../usersearch/usersearch.component';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  isLoaded = false;

  votes: Vote[];
  selectedVote: Vote;

  constructor(public auth: AuthService,
              private voteService: VoteService,
              private modalService: NgbModal) { }

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
    this.voteService.submitVote(this.selectedVote.id, s).subscribe(() => {
      // update UI
      this.selectedVote.voted_to = s;
    });
  }

  openFormModal(vote: Vote) {
    console.log('must open user search');
    this.selectedVote = vote;
    const modalRef = this.modalService.open(UserSearchComponent);
    modalRef.componentInstance.voteName = this.selectedVote.name;
    modalRef.componentInstance.selectedUser.subscribe((s) => this.submitVote(s));
  }

}
