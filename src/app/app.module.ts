import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StudentsComponent } from './component/students/students.component';
import { LandingComponent } from './component/landing/landing.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';
import { NotFoundComponent } from './component/notfound/notfound.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { VoteComponent } from './component/vote/vote.component';
import { UserSearchComponent } from './component/usersearch/usersearch.component';
import { PersianifyPipe } from './pipes/persianify.pipe';
import { SideMenuComponent } from './component/sidemenu/sidemenu.component';
import { NavComponent } from './component/nav/nav.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropComponent } from './component/imagecrop/imagecrop.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QuestionDialogComponent } from './component/question-dialog/question-dialog.component';
import { TwoDigitPipe } from './pipes/twodigit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    LandingComponent,
    LoginComponent,
    ProfileComponent,
    EditprofileComponent,
    FilterPipe,
    PersianifyPipe,
    TwoDigitPipe,
    NotFoundComponent,
    VoteComponent,
    UserSearchComponent,
    SideMenuComponent,
    NavComponent,
    ImageCropComponent,
    QuestionDialogComponent,
    TwoDigitPipe
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ImageCropperModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ImageCropComponent,
    UserSearchComponent,
    QuestionDialogComponent
  ]
})
export class AppModule { }
