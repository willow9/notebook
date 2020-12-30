import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../reducers/auth.reducer";
import { getError, getUser } from "../selectors/auth.selectors";
import {
  SignUpStarted,
  SignOut,
  SignInStarted,
} from "./../actions/auth.actions";

@Injectable({ providedIn: "root" })
export class AuthFacade {
  constructor(private store: Store<State>) {}

  user$ = this.store.select(getUser);
  errorMessage$ = this.store.select(getError);

  login(payload: { email: string; password: string }): void {
    this.store.dispatch(new SignInStarted(payload));
  }
  register(payload: { email: string; password: string }): void {
    this.store.dispatch(new SignUpStarted(payload));
  }
  logout(): void {
    this.store.dispatch(new SignOut());
  }
}
