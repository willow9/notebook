import { Record } from "./../../model/record.model";
import { Action } from "@ngrx/store";
export const ADD_RECORD = "ADD_RECORD";
export const SET_RECORDS = "SET_RECORDS";
export const FETCHING_STARTED = "FETCHING_STARTED";
export const FETCHING_FAILED = "FETCHING_FAILED";
export const ADDITION_STARTED = "ADDITION_STARTED";

export class AddRecord implements Action {
  readonly type = ADD_RECORD;

  constructor(public payload: Record) {}
}

export class SetRecords implements Action {
  readonly type = SET_RECORDS;
  constructor(public payload: Record[]) {}
}
export class FetchingStarted implements Action {
  readonly type = FETCHING_STARTED;
  constructor(public payload: string) {}
}

export class FetchingFailed implements Action {
  readonly type = FETCHING_FAILED;
  constructor(public payload: string) {}
}

export class AdditionStarted implements Action {
  readonly type = ADDITION_STARTED;
  constructor(public payload: { record: Record; userId: string }) {}
}
export type RecordsActions =
  | SetRecords
  | FetchingStarted
  | FetchingFailed
  | AdditionStarted
  | AddRecord;
