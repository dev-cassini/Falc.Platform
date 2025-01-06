import { Injectable } from '@angular/core';
import { LoadingService } from "../../../app/core/loading/services/loading.service";
import { finalize, Observable } from "rxjs";
import { CommunicationsApiService } from "./communications-api.service";
import {UserModel} from "./models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CommunicationsApiFacadeService {
  constructor(
    private readonly communicationsApiService: CommunicationsApiService,
    private readonly loadingService: LoadingService) { }

  getUser(): Observable<UserModel> {
    this.loadingService.loadingOn();
    return this.communicationsApiService.getUser().pipe(
      finalize(() => this.loadingService.loadingOff()),
    );
  }
}
