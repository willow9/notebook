import { User } from "./../../model/user.model";
import { Action } from "@ngrx/store";
export const SIGN_UP_STARTED = "SIGN_UP_STARTED";
export const SIGN_UP = "SIGN_UP";
export const SIGN_IN_STARTED = "SIGN_IN_STARTED";
export const SIGN_IN = "SIGN_IN";
export const AUTH_ERROR = "AUTH_EROR";

export class SignUpStarted implements Action {
  readonly type = SIGN_UP_STARTED;
  constructor(public payload: { email: string; password: string }) {}
}
export class SignUp implements Action {
  readonly type = SIGN_UP;
  constructor(public payload: User) {}
}
export class SignInStarted implements Action {
  readonly type = SIGN_IN_STARTED;
  constructor(public payload: { email: string; password: string }) {}
}
export class SignIn implements Action {
  readonly type = SIGN_IN;
  constructor(public payload: User) {}
}
export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload: string) {}
}

export type AuthActions =
  | SignUp
  | SignUpStarted
  | AuthError
  | SignInStarted
  | SignIn;
