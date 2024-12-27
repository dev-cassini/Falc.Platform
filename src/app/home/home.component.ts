import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  public configuration$ = this.oidcSecurityService.getConfiguration();
  public userData$ = this.oidcSecurityService.userData$;

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  refreshSession(): void {
    this.oidcSecurityService
      .forceRefreshSession()
      .subscribe((result) => console.log(result));
  }

  logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }

  logoffAndRevokeTokens(): void {
    this.oidcSecurityService
      .logoffAndRevokeTokens()
      .subscribe((result) => console.log(result));
  }

  revokeRefreshToken(): void {
    this.oidcSecurityService
      .revokeRefreshToken()
      .subscribe((result) => console.log(result));
  }

  revokeAccessToken(): void {
    this.oidcSecurityService
      .revokeAccessToken()
      .subscribe((result) => console.log(result));
  }
}
