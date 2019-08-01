import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'p', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
