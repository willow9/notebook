import { Observable } from "rxjs";
import { AuthFacade } from "./../store/facades/auth.facade";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authFacade.user$.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        } else {
          const modifiedRequest = request.clone({
            params: new HttpParams().set("auth", user.token),
          });
          return next.handle(modifiedRequest);
        }
      })
    );
  }
}
