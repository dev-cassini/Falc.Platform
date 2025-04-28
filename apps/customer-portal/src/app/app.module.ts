import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthConfigModule, HmacAuthorizationOverrideInterceptor } from '@falc-platform/shared/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoadingSpinnerComponent } from './core/loading/loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { routes } from './app.routes';
import {
  MarketingPreferencesCentreComponent
} from './users/marketing-preferences-centre/marketing-preferences-centre.component';
import { NavbarComponent } from './core/navbar/navbar.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    MarketingPreferencesCentreComponent,
    MyProfileComponent,
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AuthConfigModule,
    FormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NavbarComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HmacAuthorizationOverrideInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
