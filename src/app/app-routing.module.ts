import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {EditprofileComponent} from './editprofile/editprofile.component';
import {NotFoundComponent} from './notfound/notfound.component';
import {VoteComponent} from './vote/vote.component';
import {SideMenuComponent} from './sidemenu/sidemenu.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'edit', component: EditprofileComponent},
  {path: 'vote', component: VoteComponent},
  {path: 'side', component: SideMenuComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
