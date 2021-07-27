import {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
  GET_SINGLE_EVENT_SUCCESS,
  GET_SINGLE_EVENT_FAIL,
} from '../actions/types'

const initialState = {
  events: [],
  single_event: {},
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: payload.events
      }
    case GET_EVENTS_FAIL:
      return {
        ...state,
        events: []
      }
    case GET_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        single_event: payload.single_event
      }
    case GET_SINGLE_EVENT_FAIL:
      return {
        ...state,
        single_event: {}
      }
    default:
      return state
  }
}