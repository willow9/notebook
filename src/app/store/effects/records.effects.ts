import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { forkJoin, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as RecordsActions from "../actions/record.actions";
import { Record } from "../../model/record.model";
import { Injectable } from "@angular/core";

@Injectable()
export class RecordsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}
  @Effect()
  recordsFetching = this.actions$.pipe(
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
              recordsArray.push({ ...response[key], id: key });
            }
            return new RecordsActions.SetRecords(recordsArray);
          }),
          catchError(error => {
            return of(new RecordsActions.FetchingFailed(error));
          })
        );
    })
  );
  @Effect()
  recordAddition = this.actions$.pipe(
    ofType(RecordsActions.ADDITION_STARTED),
    switchMap((response: RecordsActions.AdditionStarted) => {
      const recordId$ = this.http.post<{ name: string }>(
        `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${response.payload.userId}.json`,
        {
          phoneNumber: response.payload.record.phoneNumber,
          description: response.payload.record.description,
          internalTitle: response.payload.record.internalTitle,
          externalTitle: response.payload.record.externalTitle,
        }
      );
      const record$ = of(response.payload.record);

      return forkJoin([recordId$, record$])
        .pipe(
          map(res => {
            const record = new Record(
              res[1].phoneNumber,
              res[1].description,
              res[1].internalTitle,
              res[1].externalTitle,
              res[0].name
            );
            return record;
          })
        )
        .pipe(
          map(response => {
            return new RecordsActions.AddRecord(response);
          })
        );
    })
  );
  @Effect()
  recordEditing = this.actions$.pipe(
    ofType(RecordsActions.EDITING_STARTED),
    switchMap((response: RecordsActions.EditingStarted) => {
      const response$ = of(response.payload.record);
      const editedRecord$ = this.http.patch(
        `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${response.payload.userId}/${response.payload.record.id}.json`,
        {
          phoneNumber: response.payload.record.phoneNumber,
          description: response.payload.record.description,
          internalTitle: response.payload.record.internalTitle,
          externalTitle: response.payload.record.externalTitle,
        }
      );

      return editedRecord$
        .pipe(
          switchMap(() => {
            return response$;
          })
        )
        .pipe(
          map(response => {
            return new RecordsActions.EditRecord(response);
          })
        );
    })
  );
  @Effect({ dispatch: false })
  recordDeletion = this.actions$.pipe(
    ofType(RecordsActions.DELETE),
    switchMap((data: RecordsActions.Delete) => {
      return this.http.delete(
        `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${data.payload.userId}/${data.payload.recordId}.json`
      );
    })
  );
}
