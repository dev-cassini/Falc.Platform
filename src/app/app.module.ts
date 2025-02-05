import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { AuthConfigModule } from "./core/auth/auth-config.module";
import { LoadingSpinnerComponent } from "./core/loading/loading-spinner/loading-spinner.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { ToolbarComponent } from "./core/nav/toolbar/toolbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AuthInterceptor } from "angular-auth-oidc-client";
import { HmacAuthorizationOverrideInterceptor } from "./core/auth/interceptors/hmac-authorization-override.interceptor";
import {
  MarketingPreferencesCentreComponent
} from "./users/marketing-preferences-centre/marketing-preferences-centre.component";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    MarketingPreferencesCentreComponent,
    MyProfileComponent,
    NotFoundComponent,
    ToolbarComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AuthConfigModule,
    FormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HmacAuthorizationOverrideInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
