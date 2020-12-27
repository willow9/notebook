import { User } from "src/app/model/user.model";
import * as AuthActions from "./../actions/auth.actions";

export interface State {
  user: User | null;
  errorMessage: string;
}

const initialState: State = {
  user: null,
  errorMessage: null,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGN_UP:
      return { ...state, user: action.payload, errorMessage: null };
    case AuthActions.SIGN_IN:
      return { ...state, user: action.payload, errorMessage: null };
    case AuthActions.SIGN_OUT:
      return { ...state, user: null };
    case AuthActions.AUTH_ERROR:
      return { ...state, user: null, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
