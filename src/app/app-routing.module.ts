import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './component/students/students.component';
import {LandingComponent} from './component/landing/landing.component';
import {LoginComponent} from './component/login/login.component';
import {ProfileComponent} from './component/profile/profile.component';
import {EditprofileComponent} from './component/editprofile/editprofile.component';
import {NotFoundComponent} from './component/notfound/notfound.component';
import {VoteComponent} from './component/vote/vote.component';
import {SideMenuComponent} from './component/sidemenu/sidemenu.component';

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
