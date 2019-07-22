import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
