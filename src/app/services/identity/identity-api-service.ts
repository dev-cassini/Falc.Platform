import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UserModel} from "./models/user.model";

@Injectable({ providedIn: "root" })
export class IdentityApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getUser(id: string): Observable<UserModel> {
    return this.httpClient
      .get<UserModel>(`https://localhost:44302/api/users/${id}`)
      .pipe(map((user) => user as UserModel))
  }
}
