import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {EditprofileComponent} from './editprofile/editprofile.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'edit', component: EditprofileComponent},
  {path: ':id', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
