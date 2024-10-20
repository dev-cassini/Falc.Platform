import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { AuthConfigModule } from "./auth/auth-config.module";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "angular-auth-oidc-client";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AuthConfigModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
