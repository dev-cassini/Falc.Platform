import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {UnauthorizedComponent} from "./core/auth/unauthorized/unauthorized.component";
import {AutoLoginPartialRoutesGuard} from "angular-auth-oidc-client";

export const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AutoLoginPartialRoutesGuard]
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AutoLoginPartialRoutesGuard]
  }
];
