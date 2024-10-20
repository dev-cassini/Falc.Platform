import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { OidcSecurityService } from "angular-auth-oidc-client";
import {Subscription, tap} from "rxjs";
import {IdentityApiService} from "../services/identity/identity-api-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly identityApiService: IdentityApiService = inject(IdentityApiService);
  private readonly subscriptions: Subscription = new Subscription();

  public configuration$ = this.oidcSecurityService.getConfiguration();
  public userData$ = this.oidcSecurityService.userData$;
  public isAuthenticated = false;

  ngOnInit(): void {
    const isAuthenticatedSubscription: Subscription = this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
      }
    );

    // this.userData$.subscribe((x) => {
    //   console.log(x);
    //   if (x.userData) {
    //     this.identityApiService.getUser(x.userData.sub)
    //       .pipe(tap((x) => console.log(x)))
    //       .subscribe();
    //   }
    // })
    this.subscriptions.add(isAuthenticatedSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

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
