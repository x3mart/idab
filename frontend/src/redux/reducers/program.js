import {
  GET_PROGRAM_SUCCESS,
  GET_PROGRAM_FAIL
} from '../actions/types'

const initialState = {
  program: {},
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case GET_PROGRAM_SUCCESS:
      return {
        ...state,
        program: payload.program
      }
    case GET_PROGRAM_FAIL:
      return {
        ...state,
        program: {}
      }
    default:
      return state
  }
}