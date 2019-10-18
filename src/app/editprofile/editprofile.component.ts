import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Student} from '../shared/models/student.model';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {StudentService} from '../student.service';
import * as moment from 'jalali-moment';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  isLoaded = false;
  isSubmitting = false;
  edit_subpage = 0;

  student: Student = new Student();

  profile_image_upload: File;
  profile_image_preview: any;
  profile_image_changed = false;

  jalali_year: string;
  jalali_month: string;
  jalali_day: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public auth: AuthService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    console.log('getting my info ...');
    this.profileService.getProfile().subscribe((resp) => {
      this.student = resp;
      this.isLoaded = true;
      // init jalali birthday
      const m: string = moment.unix(this.student.birthday).locale('fa').format('YYYY/MM/DD');
      const date: string[] = m.split('/');
      this.jalali_year = date[0];
      this.jalali_month = date[1];
      this.jalali_day = date[2];
    });

    if (this.auth.profileCompleted) {
      // todo
    } else {
    }
  }

  parseBirthday() {
    const m = moment.from(this.jalali_year + '/' + this.jalali_month + '/' + this.jalali_day, 'fa', 'YYYY/MM/DD');
    this.student.birthday = m.unix();
    console.log(m.unix());
  }

  previewProfilePic(files) {
    if (files.length === 0) {
      return;
    }
    // check file type
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('only images are supported.');
      return;
    }
    // resize image for upload and preview it
    this.ng2ImgMax.resizeImage(files[0], 255, 255).subscribe(
      result => {
        this.profile_image_upload = new File([result], result.name);
        const reader = new FileReader();
        reader.readAsDataURL(this.profile_image_upload);
        reader.onload = () => {
          this.profile_image_preview = reader.result;
        };
        this.profile_image_changed = true;
      },
      error => {
        console.log('error resizing picture: ', error);
      }
    );
  }

  submit() {
    this.isSubmitting = true;
    if (this.profile_image_changed) {
      this.profileService.setProfilePic(this.profile_image_upload).subscribe(() => {
        console.log('image upload done !');
      });
    }
    this.profileService.setProfile(this.student).subscribe(() => {
      console.log('profile updated !');
    });
  }
}
