import { Record } from "src/app/model/record.model";
import * as RecordsActions from "./../actions/record.actions";

export interface State {
  records: Record[];
  fetchError: string;
}

const initialState: State = {
  records: [],
  fetchError: null,
};
export function recordsReducer(
  state = initialState,
  action: RecordsActions.RecordsActions
): State {
  switch (action.type) {
    case RecordsActions.ADD_RECORD:
      return { ...state, records: [...state.records, action.payload] };
    case RecordsActions.SET_RECORDS:
      return { ...state, records: [...action.payload], fetchError: null };
    case RecordsActions.FETCHING_FAILED:
      return { ...state, fetchError: action.payload };
    case RecordsActions.EDIT_RECORD:
      const filteredRecords = state.records.filter(r => {
        return r.id !== action.payload.id;
      });
      return {
        ...state,
        records: [...filteredRecords, action.payload],
      };
    case RecordsActions.DELETE:
      return {
        ...state,
        records: state.records.filter(r => {
          return r.id !== action.payload.recordId;
        }),
      };
    default:
      return state;
  }
}
