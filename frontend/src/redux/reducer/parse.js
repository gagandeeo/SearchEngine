/* eslint-disable import/no-anonymous-default-export */
import { SEARCH_POST } from "../actions/types";

const initialState = {
  term: [],
  // filter: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_POST:
      return {
        ...state,
        term: action.payload,
      };
    default:
      return state;
  }
}
