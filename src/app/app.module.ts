import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { VoteComponent } from './vote/vote.component';
import { UserSearchComponent } from './usersearch/usersearch.component';
import {PersianifyPipe} from './shared/pipes/persianify.pipe';

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
    NotFoundComponent,
    VoteComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    Ng2ImgMaxModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
