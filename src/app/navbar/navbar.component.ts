import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as fromAppReducer from "./../store/reducers/app.reducer";
import * as AuthActions from "./../store/actions/auth.actions";
import { getUser } from "../store/selectors/auth.selectors";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  logedInUser = false;

  constructor(
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.pipe(select(getUser)).subscribe(user => {
      this.logedInUser = !!user;
      console.log(this.logedInUser);
    });
  }

  logout(): void {
    this.store.dispatch(new AuthActions.SignOut());
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
