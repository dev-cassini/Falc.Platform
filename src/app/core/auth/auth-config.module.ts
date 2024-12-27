import { NgModule } from "@angular/core";
import { AuthModule } from "angular-auth-oidc-client";

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://falc.sts.local',
        redirectUrl: `${window.location.origin}/callback`,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'FalcPlatform',
        scope: 'openid profile offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        secureRoutes: ['https://localhost']
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
