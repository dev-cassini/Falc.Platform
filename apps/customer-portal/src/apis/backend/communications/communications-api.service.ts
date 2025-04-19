import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASE_URL } from "../constants";
import { UserModel } from "./models/user.model";
import { PatchUserRequest } from "./models/patch-user.req";

@Injectable({
  providedIn: 'root'
})
export class CommunicationsApiService {
  private readonly baseRoutePath = "api/communications";

  constructor(private readonly httpClient: HttpClient) { }

  getMyUser(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${BASE_URL}/${this.baseRoutePath}/users/me`);
  }

  patchMyUser(request: PatchUserRequest): Observable<object> {
    return this.httpClient.patch(`${BASE_URL}/${this.baseRoutePath}/users/me`, request);
  }

  getUser(userId: string, hmacSignature: string): Observable<UserModel> {
    return this.httpClient
      .get<UserModel>(
        `${BASE_URL}/${this.baseRoutePath}/users/${userId}`,
        {
          headers: new HttpHeaders({
            'X-Authorization-HMAC-SHA256': `HMAC-SHA256 ${hmacSignature}`,
          })
        });
  }

  patchUser(request: PatchUserRequest, hmacSignature: string): Observable<object> {
    return this.httpClient
      .patch(
        `${BASE_URL}/${this.baseRoutePath}/users/${request.id}`,
        request,
        {
          headers: new HttpHeaders({
            'X-Authorization-HMAC-SHA256': `HMAC-SHA256 ${hmacSignature}`,
          })
        });
  }
}
