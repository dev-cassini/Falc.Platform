import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { HmacAuthorizationOverrideInterceptor } from './core/auth/interceptors/hmac-authorization-override.interceptor';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthConfigModule } from './core/auth/auth-config.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarComponent } from './core/nav/toolbar/toolbar.component';
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

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    MarketingPreferencesCentreComponent,
    MyProfileComponent,
    NotFoundComponent,
    ToolbarComponent,
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
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
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
