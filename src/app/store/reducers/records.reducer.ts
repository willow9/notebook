import { Record } from "src/app/model/record.model";
import * as RecordsActions from "./../actions/record.actions";

export interface State {
  records: Record[];
  fetchError: string;
}

const initialState: State = {
  records: [],
  fetchError: null,
  //   startRecordEditing: null,
  //   startNewRecordAddition: false,
  // newRecord: null,
  //   userId: "",
  //   editedRecord: null,
};
export function recordsReducer(
  state = initialState,
  action: RecordsActions.RecordsActions
) {
  switch (action.type) {
    case RecordsActions.ADD_RECORD:
      return { ...state, records: [...state.records, action.payload] };
    case RecordsActions.SET_RECORDS:
      return { ...state, records: [...action.payload], fetchError: null };
    case RecordsActions.FETCHING_FAILED:
      return { ...state, fetchError: action.payload };
    default:
      return state;
  }
}
