import { SEARCH_POST } from "./types";

export const searchParse = (data) => (dispatch) => {
  dispatch({
    type: SEARCH_POST,
    payload: data,
  });
};
