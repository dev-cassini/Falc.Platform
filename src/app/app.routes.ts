import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {UnauthorizedComponent} from "./core/auth/unauthorized/unauthorized.component";
import {AuthorizationGuard} from "./core/auth/authorization.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthorizationGuard]
  }
];
