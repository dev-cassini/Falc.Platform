import {Observable, of} from "rxjs";
import {AuthenticatedResult, LoginResponse, OpenIdConfiguration, UserDataResult } from "angular-auth-oidc-client";

export class OidcSecurityServiceStub {
  get isAuthenticated$(): Observable<AuthenticatedResult> {
    return of({
      isAuthenticated: true
    } as AuthenticatedResult)
  }

  getConfiguration(configId?: string): Observable<OpenIdConfiguration | null> {
    return of(null);
  }

  get userData$(): Observable<UserDataResult> {
    return of({} as UserDataResult)
  }

  checkAuth(url?: string, configId?: string): Observable<LoginResponse> {
    return of({
      isAuthenticated: true,
      accessToken: 'test_access_token'
    } as LoginResponse)
  }
}
