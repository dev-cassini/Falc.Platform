import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserModel} from "../core/auth/services/identity/models/user.model";
import {IdentityApiFacadeService} from "../core/auth/services/identity/identity-api-facade.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  public user$: Observable<UserModel> | undefined;

  constructor(private readonly identityApiFacadeService: IdentityApiFacadeService) { }

  ngOnInit() {
    this.user$ = this.identityApiFacadeService.getUser();
  }
}
