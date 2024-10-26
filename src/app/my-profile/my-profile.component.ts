import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {UserModel} from "../core/auth/services/identity/models/user.model";
import {IdentityApiService} from "../core/auth/services/identity/identity-api-service";
import {LoadingService} from "../core/loading/services/loading.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  public user$: Observable<UserModel> | undefined;

  constructor(
    private readonly identityApiService: IdentityApiService,
    private readonly loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loadingOn()
    const userId: string = this.oidcSecurityService.userData().userData.sub;
    this.user$ = this.identityApiService.getUser(userId);
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 3000)
  }
}
