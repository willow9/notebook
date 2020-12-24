import { Record } from "./../../model/record.model";
import { Action } from "@ngrx/store";
export const ADD_RECORD = "ADD_RECORD";
export const SET_RECORDS = "SET_RECORDS";

export class AddRecord implements Action {
  readonly type = ADD_RECORD;
  payload: Record;
}

export class SetRecords implements Action {
  readonly type = SET_RECORDS;
  constructor(public payload: Record[]) {}
}
export type RecordsActions = SetRecords;
