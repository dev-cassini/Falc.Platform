import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, mergeMap, Subscription } from "rxjs";
import { IdentityApiFacadeService } from "../../apis/identity/identity-api-facade.service";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { CommunicationsApiFacadeService } from "../../apis/backend/communications/communications-api-facade.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
  standalone: false
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);

  private userSubscription: Subscription | undefined;
  public myProfileForm: UntypedFormGroup | undefined;

  constructor(
    private readonly identityApiFacadeService: IdentityApiFacadeService,
    private readonly communicationsApiFacade: CommunicationsApiFacadeService) { }

  ngOnInit() {
    this.userSubscription = this.identityApiFacadeService.getUser()
      .pipe(
        mergeMap((x) => this.communicationsApiFacade.getMyUser()
          .pipe(map((y) => {
            this.myProfileForm = this.formBuilder.group({
              username: [x.userName, Validators.required],
              email: [x.email, Validators.required],
              firstName: [x.firstName],
              lastName: [x.lastName],
              marketingPreferences: this.formBuilder.group({
                email: [y.marketingPreferences.email],
                phone: [y.marketingPreferences.phone],
                sms: [y.marketingPreferences.sms],
              })
            });

            this.myProfileForm.get('marketingPreferences.email')?.disable();
            this.myProfileForm.get('marketingPreferences.phone')?.disable();
            this.myProfileForm.get('marketingPreferences.sms')?.disable();

            return x;
          }))
        )).subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
