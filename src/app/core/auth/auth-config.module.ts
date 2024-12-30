import { NgModule } from "@angular/core";
import { AuthModule } from "angular-auth-oidc-client";

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://sts.falc.local',
        redirectUrl: `${window.location.origin}/callback`,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'FalcPlatform',
        scope: 'openid profile email offline_access falc-identity:me',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        secureRoutes: [
          'https://localhost',
          'https://admin-api.falc.local',
        ],
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
