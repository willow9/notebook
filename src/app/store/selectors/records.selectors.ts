import * as fromRecordsReducer from "../reducers/records.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const getRecordsState = createFeatureSelector<fromRecordsReducer.State>(
  "recordsReducer"
);

export const getRecords = createSelector(
  getRecordsState,
  (state: fromRecordsReducer.State) => state.records
);
export const getRecord = createSelector(
  getRecordsState,
  (state: fromRecordsReducer.State) => state.selectedForEditing
);
