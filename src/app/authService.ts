import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators"
import { throwError } from "rxjs"

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
    displayName?: string,
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {

    }
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7x1KNJw2HZ8j0S95Taf-v3gr3w5989Is',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorResponse => {
            let errorMessage = "An unknown error occured";
            if (!errorResponse.error || !errorResponse.error.error) {
                return throwError(errorMessage)
            }

            switch (errorResponse.error.error.message) {
                case "EMAIL_EXISTS":
                    errorMessage = "This email exists, please login."
            }
            return throwError(errorMessage)
        })
        );
    }

    login(email: string, password: string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7x1KNJw2HZ8j0S95Taf-v3gr3w5989Is', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleErrors)
        );
    }

    private handleErrors(errorResponse: HttpErrorResponse) {
        let errorMessage = "An unknown error occured";
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage)
        }

        switch (errorResponse.error.error.message) {
            case "EMAIL_NOT_FOUND":
                errorMessage = "Email not found, please sign up.";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "Invalid password."
                break;
            case "USER_DISABLED":
                errorMessage = "The user account has been disabled by an administrator."
                break;
        }
        return throwError(errorMessage)

    }
}
