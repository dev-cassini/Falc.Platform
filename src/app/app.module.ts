import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "angular-auth-oidc-client";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {UnauthorizedComponent} from "./core/auth/unauthorized/unauthorized.component";
import {AuthConfigModule} from "./core/auth/auth-config.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyProfileComponent,
    UnauthorizedComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AuthConfigModule,
    NgOptimizedImage
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
