import { getRecords, getRecord } from "./../selectors/records.selectors";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../reducers/records.reducer";
import { Record } from "src/app/model/record.model";
import {
  AdditionStarted,
  Delete,
  EditingStarted,
  FetchingStarted,
  SelectedForEditing,
} from "./../actions/record.actions";

@Injectable({ providedIn: "root" })
export class RecordsFacade {
  constructor(private store: Store<State>) {}

  records$ = this.store.select(getRecords);
  selectedRecord$ = this.store.select(getRecord);

  addRecord(payload: { record: Record; userId: string }): void {
    this.store.dispatch(new AdditionStarted(payload));
  }
  editRecord(payload: { record: Record; userId: string }): void {
    this.store.dispatch(new EditingStarted(payload));
  }
  selectForEditing(payload: Record): void {
    this.store.dispatch(new SelectedForEditing(payload));
  }
  deleteRecord(payload: { recordId: string; userId: string }): void {
    this.store.dispatch(new Delete(payload));
  }
  fetchRecords(payload: string): void {
    this.store.dispatch(new FetchingStarted(payload));
  }
}
