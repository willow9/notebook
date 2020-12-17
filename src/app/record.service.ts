import { AuthService } from './authService';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from "rxjs/operators"
import { Observable, Subject, Subscription, throwError } from "rxjs"
import { User } from './model/user.model';
import { Record } from './model/record.model';

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
export class RecordService {
    // user = new Subject<User>()

    userId: string


    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.user.subscribe((user) => {
            if (user != null) {
                this.userId = user.id;
            }
            else this.userId = ""
        })
    }

    postRecord(phone: string, description: string, internal: string, external: string) {
        console.log(this.userId);
        return this.http.post(`https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}.json`,
            {
                phone: phone,
                description: description,
                internal: internal,
                external: external

            }
        );
    }

    getRecord() {
        return this.http.get(`https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}.json`)
            .pipe(map(responseData => {
                const recordsArray = []
                for (const key in responseData) {
                    recordsArray.push({ ...responseData[key], recordId: key })
                }
                return recordsArray
            }))

    }


}
