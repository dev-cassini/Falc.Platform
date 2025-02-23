import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  CommunicationsApiFacadeService,
  ErrorResponse
} from "../../../apis/backend/communications/communications-api-facade.service";
import { Observable, Subscription } from "rxjs";
import { UserModel } from "../../../apis/backend/communications/models/user.model";
import { FormBuilder, UntypedFormGroup } from "@angular/forms";
import { PatchUserRequest } from "../../../apis/backend/communications/models/patch-user.req";

@Component({
  selector: 'app-marketing-preferences-centre',
  templateUrl: './marketing-preferences-centre.component.html',
  styleUrl: './marketing-preferences-centre.component.css',
  standalone: false
})
export class MarketingPreferencesCentreComponent implements OnInit, OnDestroy {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly communicationsApiFacade: CommunicationsApiFacadeService = inject(CommunicationsApiFacadeService);
  private formBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);

  private getUserResponse$: Observable<UserModel | ErrorResponse> | null = null;
  public marketingPreferencesCentreForm: UntypedFormGroup | undefined;
  private getUserSubscription: Subscription | undefined;
  private patchUserSubscription: Subscription | undefined;

  ngOnInit(): void {
    const userId: string | null = this.activatedRoute.snapshot.paramMap.get('userId');
    const hmacSignature: string | null = this.activatedRoute.snapshot.queryParamMap.get('sig');

    if (userId === null || hmacSignature === null) {
      this.router.navigate(['/not-found']).then();
      return;
    }

    this.getUserResponse$ = this.communicationsApiFacade.getUser(userId, hmacSignature);
    this.getUserSubscription = this.getUserResponse$.subscribe(getUserResponse => {
      const errorResponse: ErrorResponse = getUserResponse as ErrorResponse;
      if (errorResponse.statusCode === 401) {
        this.router.navigate(['/not-found']).then();
        return;
      }

      const user: UserModel = getUserResponse as UserModel;
      this.marketingPreferencesCentreForm = this.formBuilder.group({
        email: [user.marketingPreferences.email],
        phone: [user.marketingPreferences.phone],
        sms: [user.marketingPreferences.sms],
      });
    })
  }

  ngOnDestroy(): void {
    this.getUserSubscription?.unsubscribe();
    this.patchUserSubscription?.unsubscribe();
  }

  saveMarketingPreference(): void {
    const userId: string | null = this.activatedRoute.snapshot.paramMap.get('userId');
    const patchUserRequest: PatchUserRequest = {
      id: userId,
      marketingPreferences: {
        email: this.marketingPreferencesCentreForm?.get('email')?.value,
        phone: this.marketingPreferencesCentreForm?.get('phone')?.value,
        sms: this.marketingPreferencesCentreForm?.get('sms')?.value,
      }
    } as PatchUserRequest;

    const hmacSignature: string | null = this.activatedRoute.snapshot.queryParamMap.get('sig');
    this.patchUserSubscription = this.communicationsApiFacade.patchUser(patchUserRequest, hmacSignature ?? '').subscribe()
  }
}
