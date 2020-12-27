import { User } from "./../../model/user.model";
import { Action } from "@ngrx/store";
export const SIGN_UP_STARTED = "SIGN_UP_STARTED";
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_ERROR = "SIGN_UP_EROR";

export class SignUpStarted implements Action {
  readonly type = SIGN_UP_STARTED;
  constructor(public payload: { email: string; password: string }) {}
}
export class SignUp implements Action {
  readonly type = SIGN_UP;
  constructor(public payload: User) {}
}
export class SignUpError implements Action {
  readonly type = SIGN_UP_ERROR;
  constructor(public payload: string) {}
}

export type AuthActions = SignUp | SignUpStarted | SignUpError;
