import { ActionReducerMap } from "@ngrx/store";
import * as fromRecordsReducer from "../reducers/records.reducer";
import * as fromAuthReducer from "../reducers/auth.reducer";

export interface AppState {
  recordsReducer: fromRecordsReducer.State;
  authReducer: fromAuthReducer.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  recordsReducer: fromRecordsReducer.recordsReducer,
  authReducer: fromAuthReducer.authReducer,
};
