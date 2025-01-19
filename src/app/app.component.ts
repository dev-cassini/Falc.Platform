import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OidcSecurityService } from "angular-auth-oidc-client";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  private authSubscription: Subscription | undefined;

  public isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authSubscription = this.oidcSecurityService.checkAuth()
      .subscribe((x) => {
        this.isAuthenticated = x.isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
