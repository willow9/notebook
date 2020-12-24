import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as RecordsActions from "../actions/record.actions";
import { Record } from "../../model/record.model";
import { Injectable } from "@angular/core";

@Injectable()
export class RecordsEffects {
  @Effect()
  recordsFetching: Observable<any> = this.actions$.pipe(
    ofType(RecordsActions.FETCHING_STARTED),
    switchMap((response: RecordsActions.FetchingStarted) => {
      return this.http
        .get(
          `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${response.payload}.json`
        )
        .pipe(
          map(response => {
            const recordsArray: Record[] = [];
            for (const key in response) {
              recordsArray.push({ ...response[key], recordId: key });
            }
            recordsArray;
            return new RecordsActions.SetRecords(recordsArray);
          }),
          catchError(error => {
            return of();
          })
        );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
