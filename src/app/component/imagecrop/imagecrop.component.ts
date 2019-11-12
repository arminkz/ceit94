import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-imagecrop',
  templateUrl: './imagecrop.component.html',
  styleUrls: ['./imagecrop.component.scss']
})
export class ImageCropComponent implements OnInit {
  @Input() imageChangedEvent: any = '';
  @Output() imageCropped: EventEmitter<any> = new EventEmitter();
  croppedImage: any = '';
  croppedImageFile: any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  imageCropChanged(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImageFile = event.file;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  submit() {
    this.imageCropped.emit({base64: this.croppedImage, file: this.croppedImageFile});
    this.closeModal();
  }

}
