import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { AutoLoginPartialRoutesGuard } from "angular-auth-oidc-client";
import {
  MarketingPreferencesCentreComponent
} from "./users/marketing-preferences-centre/marketing-preferences-centre.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'not-found', component: NotFoundComponent },
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
  },
  { path: 'users/:userId/marketing-preferences-centre', component: MarketingPreferencesCentreComponent },
];
