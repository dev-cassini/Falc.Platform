import { Pipe, PipeTransform } from '@angular/core';
import { LoginResponse } from 'angular-auth-oidc-client';

@Pipe({
  name: 'userInitials'
})
export class UserInitialsPipe implements PipeTransform {

  transform(loginResponse: LoginResponse): string {
    return loginResponse.userData.name
      .split(' ').map((y: any) => y[0]).join('').toUpperCase();
  }
}
