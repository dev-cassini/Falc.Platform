import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BASE_URL} from "../constants";
import {UserModel} from "./models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CommunicationsApiService {
  private readonly baseRoutePath = "api/communications";

  constructor(private readonly httpClient: HttpClient) { }

  getUser(): Observable<UserModel> {
    return this.httpClient
      .get<UserModel>(`${BASE_URL}/${this.baseRoutePath}/users/me`)
      .pipe(map((user) => user as UserModel))
  }
}
