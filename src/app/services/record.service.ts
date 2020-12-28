// import { AuthService } from "./authService";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { Record } from "../model/record.model";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../store/reducers/app.reducer";
import * as RecordsActions from "../store/actions/record.actions";

export interface NewRecordResponse {
  name: string;
}

@Injectable({ providedIn: "root" })
export class RecordService {
  editRecordEmiter = new Subject<Record>();
  newRecord = new Subject<Record>();
  userId: string;
  editedRecord = new Subject<Record>();

  newRecordEmitter = new Subject<boolean>();
  allRecords: Record[] = [];

  constructor(
    private http: HttpClient,
    // private authService: AuthService,
    private store: Store<fromAppReducer.AppState>
  ) {
    this.store.select("authReducer").subscribe(state => {
      if (state.user != null) {
        this.userId = state.user.id;
      } else this.userId = "";
    });
  }

  // postRecord(
  //   phone: string,
  //   description: string,
  //   internal: string,
  //   external: string
  // ) {
  //   return this.http
  //     .post(
  //       `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}.json`,
  //       {
  //         phoneNumber: phone,
  //         description: description,
  //         internalTitle: internal,
  //         externalTitle: external,
  //       }
  //     )
  //     .pipe(
  //       tap((response: NewRecordResponse) => {
  //         this.newRecord.next(
  //           new Record(phone, description, internal, external, response.name)
  //         );
  //       })
  //     );
  // }

  // editRecord(
  //   docId: string,
  //   phone: string,
  //   description: string,
  //   internal: string,
  //   external: string
  // ): Observable<Record> {
  //   return this.http
  //     .patch<any>(
  //       `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}/${docId}.json`,
  //       {
  //         phoneNumber: phone,
  //         description: description,
  //         internalTitle: internal,
  //         externalTitle: external,
  //       }
  //     )
  //     .pipe(
  //       tap(response => {
  //         this.editedRecord.next(
  //           new Record(
  //             response.phoneNumber,
  //             response.description,
  //             response.internalTitle,
  //             response.externalTitle,
  //             docId
  //           )
  //         );
  //       })
  //     );
  // }

  // getRecord() {
  //   return this.http
  //     .get(
  //       `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}.json`
  //     )
  //     .pipe(
  //       map(responseData => {
  //         const recordsArray: Record[] = [];
  //         for (const key in responseData) {
  //           recordsArray.push({ ...responseData[key], recordId: key });
  //         }

  //         return recordsArray;
  //       }),
  //       tap(records => {
  //         this.store.dispatch(new RecordsActions.SetRecords(records));
  //       })
  //     );
  // }

  // deleteRecord(docId: string) {
  //   return this.http.delete(
  //     `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}/${docId}.json`
  //   );
  // }
}