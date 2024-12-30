import { Injectable } from '@angular/core';
import {IdentityApiService} from "./identity-api.service";
import {finalize, Observable} from "rxjs";
import {UserModel} from "./models/user.model";
import {LoadingService} from "../../../loading/services/loading.service";

@Injectable({
  providedIn: 'root'
})
export class IdentityApiFacadeService {
  constructor(
    private readonly identityApiService: IdentityApiService,
    private readonly loadingService: LoadingService) { }

  getUser(): Observable<UserModel> {
    this.loadingService.loadingOn();
    return this.identityApiService.getUser().pipe(
      finalize(() => this.loadingService.loadingOff()),
    );
  }
}
