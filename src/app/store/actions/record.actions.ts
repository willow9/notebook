import { Record } from "./../../model/record.model";
import { Action } from "@ngrx/store";
export const ADD_RECORD = "ADD_RECORD";
export const SET_RECORDS = "SET_RECORDS";
export const FETCHING_STARTED = "FETCHING_STARTED";

export class AddRecord implements Action {
  readonly type = ADD_RECORD;
  payload: Record;
}

export class SetRecords implements Action {
  readonly type = SET_RECORDS;
  constructor(public payload: Record[]) {}
}
export class FetchingStarted implements Action {
  readonly type = FETCHING_STARTED;
  constructor(public payload: string) {}
}
export type RecordsActions = SetRecords | FetchingStarted;
