import { Record } from "src/app/model/record.model";
import * as RecordsActions from "./../actions/record.actions";

export interface State {
  records: Record[];
}

const initialState: State = {
  records: [],
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
    // case RecordActions.ADD_RECORD:
    //   return { ...state, newRecord: action.payload };
    case RecordsActions.SET_RECORDS:
      return { ...state, records: [...action.payload] };
    default:
      return state;
  }
}
