import { Router } from "@angular/router";
import { AuthService } from "./../authService";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "./../store/reducers/app.reducer";
import * as AuthActions from "./../store/actions/auth.actions";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  logedInUser = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select("authReducer").subscribe(state => {
      this.logedInUser = !state.user ? null : true;
    });
    // this.userSub = this.authService.user.subscribe(user => {
    //   this.logedInUser = !user ? null : true;
    // });
  }

  logout(): void {
    this.store.dispatch(new AuthActions.SignOut());
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
