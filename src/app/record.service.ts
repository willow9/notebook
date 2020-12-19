import { AuthService } from "./authService";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { Record } from "./model/record.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName?: string;
}

export interface NewRecordResponse {
  name: string;
}

@Injectable({ providedIn: "root" })
export class RecordService {
  newRecord = new Subject<Record>();
  userId: string;

  newRecordEmitter = new Subject<boolean>();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      if (user != null) {
        this.userId = user.id;
      } else this.userId = "";
    });
  }

  postRecord(
    phone: string,
    description: string,
    internal: string,
    external: string
  ) {
    console.log(this.userId);
    return this.http
      .post(
        `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}.json`,
        {
          phone: phone,
          description: description,
          internal: internal,
          external: external,
        }
      )

      .pipe(
        tap((response: NewRecordResponse) => {
          this.newRecord.next(
            new Record(phone, description, internal, external, response.name)
          );
        })
      );
  }

  getRecord() {
    return this.http
      .get(
        `https://notebook-1d5cb-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}.json`
      )
      .pipe(
        map((responseData) => {
          const recordsArray: Record[] = [];
          for (const key in responseData) {
            recordsArray.push({ ...responseData[key], recordId: key });
          }

          return recordsArray;
        })
      );
  }
}
