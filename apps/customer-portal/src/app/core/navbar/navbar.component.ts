import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { UserInitialsPipe } from '../../../../../../shared/src/lib/auth/pipes/user-initials.pipe';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [
    AsyncPipe,
    UserInitialsPipe,
    NgOptimizedImage
  ],
  standalone: true
})
export class NavbarComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  public loginResponse$: Observable<LoginResponse> | undefined;

  ngOnInit(): void {
    this.loginResponse$ = this.oidcSecurityService.checkAuth()
      .pipe(map(x => {
        console.log('check auth triggered: ', x);
        return x;
      }))
  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe();
  }

  navigateToHomePage(): void {
    this.router.navigate(['/home']).then();
  }

  navigateToLoginPage(): void {
    this.oidcSecurityService.authorize();
  }

  navigateToMyProfile(): void {
    this.router.navigate(['/my-profile']).then();
  }
}
