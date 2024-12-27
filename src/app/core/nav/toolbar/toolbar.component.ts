import {Component, inject, OnInit} from '@angular/core';
import {OidcSecurityService, UserDataResult} from "angular-auth-oidc-client";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  userInitials: string = '';

  private readonly oidcSecurityService = inject(OidcSecurityService);

  ngOnInit(): void {
    this.oidcSecurityService.userData$
      .subscribe((x: UserDataResult) => {
        this.userInitials = x.userData.name
          .split(' ').map((y: any) => y[0]).join('').toUpperCase();
      })
  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe();
  }
}
