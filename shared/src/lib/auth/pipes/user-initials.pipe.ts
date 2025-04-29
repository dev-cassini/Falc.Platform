import { Pipe, PipeTransform } from '@angular/core';
import { UserDataResult } from 'angular-auth-oidc-client';

@Pipe({
  name: 'userInitials'
})
export class UserInitialsPipe implements PipeTransform {

  transform(userDataResult: UserDataResult): string {
    return userDataResult.userData.name
      .split(' ').map((y: any) => y[0]).join('').toUpperCase();
  }
}
