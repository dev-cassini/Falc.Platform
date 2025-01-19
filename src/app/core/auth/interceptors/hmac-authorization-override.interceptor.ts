import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HmacAuthorizationOverrideInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const hmacHeaderValue = req.headers.get('X-Authorization-HMAC-SHA256');
      if (hmacHeaderValue !== null) {
        req = req.clone({
          headers: req.headers
            .set('Authorization', hmacHeaderValue)
            .delete('X-Authorization-HMAC-SHA256'),
        });
      }

      return next.handle(req);
    }

}
