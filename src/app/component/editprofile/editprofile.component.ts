import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Student} from '../../models/student.model';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'jalali-moment';
import {ProfileService} from '../../services/profile.service';
import {ImageCropComponent} from '../imagecrop/imagecrop.component';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  isLoaded = false;
  isSubmitting = false;
  edit_subpage = 0;

  alumni_allowed_pages = [0, 1, 2, 3, 4, 9];
  guest_allowed_pages = [0, 1, 9];
  cur_page = 0;

  student: Student = new Student();

  profile_image_preview: any;
  profile_image_file: any;
  profile_image_changed = false;
  fileEvent: any;

  jalali_year: string;
  jalali_month: string;
  jalali_day: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public auth: AuthService,
    private modalService: NgbModal,
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
  }

  nextPage() {
    if (this.student.is_alumni) {
      this.cur_page += 1;
      this.edit_subpage = this.alumni_allowed_pages[this.cur_page];
    } else {
      this.cur_page += 1;
      this.edit_subpage = this.guest_allowed_pages[this.cur_page];
    }
  }

  previousPage() {
    if (this.student.is_alumni) {
      this.cur_page -= 1;
      this.edit_subpage = this.alumni_allowed_pages[this.cur_page];
    } else {
      this.cur_page -= 1;
      this.edit_subpage = this.guest_allowed_pages[this.cur_page];
    }
  }

  getPages(): boolean[] {
    const result = [];
    if (this.student.is_alumni) {
      for (const i of this.alumni_allowed_pages) {
        result.push(this.edit_subpage >= i);
      }
    } else {
      for (const i of this.guest_allowed_pages) {
        result.push(this.edit_subpage >= i);
      }
    }
    return result;
  }

  parseBirthday() {
    const m = moment.from(this.jalali_year + '/' + this.jalali_month + '/' + this.jalali_day, 'fa', 'YYYY/MM/DD');
    this.student.birthday = m.unix();
    console.log(m.unix());
  }

  previewProfilePic(event: any) {
    this.fileEvent = event;
    this.openFormModal();
    // this.cropComponent.openModel();
    // if (files.length === 0) {
    //     //   return;
    //     // }
    //     // // check file type
    //     // const mimeType = files[0].type;
    //     // if (mimeType.match(/image\/*/) == null) {
    //     //   alert('only images are supported.');
    //     //   return;
    //     // }

    // this.imageChangedEvent = event;
    // resize image for upload and preview it
    /*this.ng2ImgToolsService.resizeExactCropImage(files[0], 255, 255).subscribe(
      result => {
        console.log('image resized !');
        console.log(result);
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
    );*/
  }

  openFormModal() {
    const modalRef = this.modalService.open(ImageCropComponent);
    modalRef.componentInstance.imageChangedEvent = this.fileEvent;
    modalRef.componentInstance.imageCropped.subscribe((image) => {
      this.profile_image_preview = image.base64;
      this.profile_image_file = image.file;
      console.log(image.file);
      this.profile_image_changed = true;
    });
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  /*fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }*/


  submit() {
    this.isSubmitting = true;
    if (this.profile_image_changed) {
      this.profileService.setProfilePic(this.profile_image_file).subscribe(() => {
        console.log('image upload done !');
        this.profileService.setProfile(this.student).subscribe(() => {
          console.log('profile updated !');
          this.router.navigateByUrl('/');
        });
      });
    } else {
      this.profileService.setProfile(this.student).subscribe(() => {
        console.log('profile updated !');
        this.router.navigateByUrl('/');
      });
    }
  }
}
