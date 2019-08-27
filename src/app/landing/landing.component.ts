import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  menu_activated = false;

  interval: any;
  now: Date;
  grad_rem = 0;

  grad_hour = 0;
  grad_min = 0;
  grad_sec = 0;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.now = new Date();
      this.grad_rem = new Date(2019, 11, 6).getTime() - this.now.getTime();

      this.grad_hour = Math.floor(this.grad_rem / (1000 * 3600));
      this.grad_min = Math.floor(this.grad_rem / (1000 * 60)) - this.grad_hour * 60;
      this.grad_sec = Math.floor(this.grad_rem / 1000) - this.grad_hour * 3600 - this.grad_min * 60;
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
