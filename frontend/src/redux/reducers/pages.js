import {
  GET_PAGES_SUCCESS,
  GET_PAGES_FAIL,
} from '../actions/types'

const initialState = {
  pages: [],
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case GET_PAGES_SUCCESS:
      return {
        ...state,
        pages: payload.pages
      }
    case GET_PAGES_FAIL:
      return {
        ...state,
        pages: []
      }
    default:
      return state
  }
}