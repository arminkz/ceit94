import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

import * as moment from 'moment';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  interval: any;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  grad_hour = 0;
  grad_min = 0;
  grad_sec = 0;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Graduation countdown
    const eventTime = moment('28-11-2019 16:00:00', 'DD-MM-YYYY HH:mm:ss').unix();
    const currentTime = moment().unix();
    let diffTime = eventTime - currentTime;
    if (diffTime > 0) {
      this.updateCountdown(diffTime);
    } else {
      this.startConfetti();
    }

    // Countdown
    if (diffTime > 0) {
      this.interval = setInterval(() => {
        diffTime = diffTime - 1;
        if (diffTime > 0) {
          this.updateCountdown(diffTime);
        } else {
          clearInterval(this.interval);
          this.startConfetti();
        }
      }, 1000);
    }

    if (!(window.opener && window.opener !== window)) {
      // you are not in a popup
      // Handle OAuth
      if (this.route.snapshot.queryParams['code'] != null) {
        this.auth.login(this.route.snapshot.queryParams['code']);
      }
    }
  }

  updateCountdown(diff) {
    const duration = moment.duration(diff * 1000, 'milliseconds');
    const days = moment.duration(duration).days();
    const hours = moment.duration(duration).hours();
    const minutes = moment.duration(duration).minutes();
    const seconds = moment.duration(duration).seconds();

    this.grad_hour = days * 24 + hours;
    this.grad_min = minutes;
    this.grad_sec = seconds;
  }

  startConfetti() {
    this.grad_hour = 0;
    this.grad_min = 0;
    this.grad_sec = 0;
    const confObject = confetti.create(this.canvas.nativeElement, { resize: true });
    setInterval(function() {
      confObject({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        shapes: ['square'],
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
    }, 200);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
