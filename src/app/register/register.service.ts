import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators"
import { throwError } from "rxjs"

interface SignUpResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({ providedIn: 'root' })
export class RegisterService {
    constructor(private http: HttpClient) {

    }
    signup(email: string, password: string) {
        return this.http.post<SignUpResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7x1KNJw2HZ8j0S95Taf-v3gr3w5989Is',
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
}