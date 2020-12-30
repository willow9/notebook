import * as fromAuthReducer from "../reducers/auth.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const getAuthState = createFeatureSelector<fromAuthReducer.State>(
  "authReducer"
);

export const getUser = createSelector(
  getAuthState,
  (state: fromAuthReducer.State) => state.user
);
export const getError = createSelector(
  getAuthState,
  (state: fromAuthReducer.State) => state.errorMessage
);
