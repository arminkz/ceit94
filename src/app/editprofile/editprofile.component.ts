import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Student} from '../shared/models/student.model';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  menu_activated = false;
  isSubmitting = false;
  edit_subpage = 0;

  student: Student;

  profile_image_upload: File;
  profile_image_preview: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    public auth: AuthService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    console.log('getting my info ...');
    this.studentService.getMe().subscribe(
      (resp) => {
        this.student = resp;
      });

    if (this.auth.profileCompleted) {
      // todo
    } else {
      // console.log('user data : ');
      // console.log(this.auth.me);
      // this.newStudent = this.auth.me;
    }
  }

  gotoLogin() {
    this.auth.redirectUrl = this.router.url;
    this.router.navigateByUrl('/login');
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
      },
      error => {
        console.log('error resizing picture: ', error);
      }
    );
  }

  submit() {
    this.isSubmitting = true;
    console.log('submitting....');
  }
}
