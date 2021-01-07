import { AuthFacade } from "./../store/facades/auth.facade";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | UrlTree {
    return this.authFacade.user$.pipe(
      map(user => {
        if (!!user) {
          return true;
        } else return this.router.createUrlTree([""]);
      })
    );
  }
}
