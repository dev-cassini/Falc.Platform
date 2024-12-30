import {Component, inject, OnInit} from '@angular/core';
import {OidcSecurityService, UserDataResult} from "angular-auth-oidc-client";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  private readonly subscriptions: Subscription = new Subscription();
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  public userInitials: string = '';

  ngOnInit(): void {
    const userDataSubscription = this.oidcSecurityService.userData$
      .subscribe((x: UserDataResult) => {
        this.userInitials = x.userData.name
          .split(' ').map((y: any) => y[0]).join('').toUpperCase();
      });

    this.subscriptions.add(userDataSubscription);
  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe();
  }

  navigateToMyProfile(): void {
    this.router.navigate(['/my-profile']).then();
  }
}
