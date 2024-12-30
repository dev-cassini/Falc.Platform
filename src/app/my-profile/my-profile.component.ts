import {Component, inject, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {UserModel} from "../core/auth/services/identity/models/user.model";
import {IdentityApiFacadeService} from "../core/auth/services/identity/identity-api-facade.service";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  public user$: Observable<UserModel> | undefined;
  public myProfileForm: UntypedFormGroup = this.formBuilder.group({});

  constructor(private readonly identityApiFacadeService: IdentityApiFacadeService) { }

  ngOnInit() {
    this.user$ = this.identityApiFacadeService.getUser()
      .pipe(
        map(x => {
          this.myProfileForm = this.formBuilder.group({
            username: [x.userName, Validators.required],
            email: [x.email, Validators.required],
            firstName: [x.firstName],
            lastName: [x.lastName],
          });

          return x;
        })
      )
  }
}
