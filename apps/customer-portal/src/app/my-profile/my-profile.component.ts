import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { finalize, map, mergeMap, Subscription } from 'rxjs';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { LoadingService } from '../core/loading/services/loading.service';
import { IdentityApiService } from '../../apis/identity/identity-api.service';
import { CommunicationsApiService } from '../../apis/backend/communications/communications-api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
  standalone: false
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);

  private userId: string | undefined = undefined;
  private userSubscription: Subscription | undefined;
  private patchUserSubscription: Subscription | undefined;
  public myProfileForm: UntypedFormGroup | undefined;

  constructor(
    private readonly identityApiService: IdentityApiService,
    private readonly communicationsApiService: CommunicationsApiService,
    private readonly loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.loadingOn();
    this.userSubscription = this.identityApiService.getUser()
      .pipe(
        mergeMap((x) => this.communicationsApiService.getMyUser()
          .pipe(map((y) => {
              this.userId = x.id;
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

              return x;
            }),
            finalize(() => this.loadingService.loadingOff()))
        )).subscribe();
  }

  onSubmit(): void {
    if (this.userId === undefined) {
      return;
    }

    this.loadingService.loadingOn();
    this.patchUserSubscription = this.communicationsApiService.patchMyUser(
      {
        id: this.userId as string,
        marketingPreferences: {
          email: this.myProfileForm?.get('marketingPreferences.email')?.value ?? false,
          phone: this.myProfileForm?.get('marketingPreferences.phone')?.value ?? false,
          sms: this.myProfileForm?.get('marketingPreferences.sms')?.value ?? false
        }
      }
    ).pipe(finalize(() => this.loadingService.loadingOff())).subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.patchUserSubscription?.unsubscribe();
  }
}
