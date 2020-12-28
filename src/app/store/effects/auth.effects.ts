import { Injectable } from "@angular/core";
import { catchError, map, switchMap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { User } from "src/app/model/user.model";
import { AuthResponseData } from "src/app/model/authResponseData";
import * as AuthActions from "./../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}
  @Effect()
  signUp = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_STARTED),
    switchMap((credentials: AuthActions.SignUpStarted) => {
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7x1KNJw2HZ8j0S95Taf-v3gr3w5989Is",
          {
            email: credentials.payload.email,
            password: credentials.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map(response => {
            return new AuthActions.SignUp(this.handleResponse(response));
          }),
          catchError(response => {
            return of(new AuthActions.AuthError(this.handleErrors(response)));
          })
        );
    })
  );
  @Effect()
  signIn = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_STARTED),
    switchMap((credentials: AuthActions.SignInStarted) => {
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7x1KNJw2HZ8j0S95Taf-v3gr3w5989Is",
          {
            email: credentials.payload.email,
            password: credentials.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map(response => {
            return new AuthActions.SignIn(this.handleResponse(response));
          }),
          catchError(response => {
            return of(new AuthActions.AuthError(this.handleErrors(response)));
          })
        );
    })
  );

  private handleResponse(response: AuthResponseData): User {
    const expirationDate = new Date(
      new Date().getTime() + response.expiresIn * 1000
    );
    return new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );
  }

  private handleErrors(errorResponse: HttpErrorResponse): string {
    let errorMessage = "An unknown error occured";
    if (!errorResponse.error || !errorResponse.error.error) {
      return errorMessage;
    }
    switch (errorResponse.error.error.message) {
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email not found, please sign up.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Invalid password.";
        break;
      case "USER_DISABLED":
        errorMessage =
          "The user account has been disabled by an administrator.";
        break;
      case "EMAIL_EXISTS":
        errorMessage = "This email exists, please login.";
        break;
    }
    return errorMessage;
  }
}
