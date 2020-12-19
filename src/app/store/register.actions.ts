import { Action } from "@ngrx/store";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGUOT";

export class Login implements Action {
  readonly type = LOGIN;

  constructor(payload: { email: string; password: string }) {}
}
