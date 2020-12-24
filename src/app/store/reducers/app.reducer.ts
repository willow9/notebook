import { ActionReducerMap } from "@ngrx/store";
import * as fromRecordsReducer from "../reducers/records.reducer";

export interface AppState {
  recordsRecucer: fromRecordsReducer.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  recordsRecucer: fromRecordsReducer.recordsReducer,
};
