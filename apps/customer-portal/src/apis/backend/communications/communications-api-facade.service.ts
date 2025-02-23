import { Injectable } from '@angular/core';
import { LoadingService } from "../../../app/core/loading/services/loading.service";
import { catchError, finalize, map, Observable, of } from "rxjs";
import { CommunicationsApiService } from "./communications-api.service";
import { UserModel } from "./models/user.model";
import { PatchUserRequest } from "./models/patch-user.req";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommunicationsApiFacadeService {
  constructor(
    private readonly communicationsApiService: CommunicationsApiService,
    private readonly loadingService: LoadingService) { }

  getMyUser(): Observable<UserModel> {
    this.loadingService.loadingOn();
    return this.communicationsApiService.getMyUser().pipe(
      finalize(() => this.loadingService.loadingOff()),
    );
  }

  getUser(userId: string, hmacSignature: string): Observable<UserModel | ErrorResponse> {
    this.loadingService.loadingOn();
    return this.communicationsApiService.getUser(userId, hmacSignature).pipe(
      catchError((x: HttpErrorResponse) => {
        console.log(x);
        return of({
          statusCode: x.status,
        } as ErrorResponse)
      }),
      finalize(() => this.loadingService.loadingOff()),
    );
  }

  patchUser(request: PatchUserRequest, hmacSignature: string): Observable<null | ErrorResponse> {
    this.loadingService.loadingOn();
    return this.communicationsApiService.patchUser(request, hmacSignature).pipe(
      map((_) => null),
      catchError((x: HttpErrorResponse) => of({
        statusCode: x.status,
      } as ErrorResponse)),
      finalize(() => this.loadingService.loadingOff()),
    );
  }
}

export interface ErrorResponse {
  statusCode: number;
}
