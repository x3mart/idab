import {
  SEND_PROGRAM_BID_SUCCESS,
  SEND_PROGRAM_BID_FAIL,
  SEND_PLAN_BID_SUCCESS,
  SEND_PLAN_BID_FAIL,
  SEND_EDUCATION_BID_SUCCESS,
  SEND_EDUCATION_BID_FAIL,
  SEND_EVENT_BID_SUCCESS,
  SEND_EVENT_BID_FAIL,
} from '../actions/types'

const initialState = {
  plan_bid_status: {},
  program_bid_status: {},
  study_bid_status: {},
  event_bid_status: {},
  category: {},
  program: {},
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case SEND_PLAN_BID_SUCCESS:
      return {
        ...state,
        plan_bid_status: payload.plan
      }
    case SEND_PLAN_BID_FAIL:
      return {
        ...state,
        plan_bid_status: payload.plan
      }
    case SEND_PROGRAM_BID_SUCCESS:
      return {
        ...state,
        program_bid_status: payload.program
      }
    case SEND_PROGRAM_BID_FAIL:
      return {
        ...state,
        program_bid_status: payload.program
      }
    case SEND_EDUCATION_BID_SUCCESS:
      return {
        ...state,
        study_bid_status: payload.education
      }
    case SEND_EDUCATION_BID_FAIL:
      return {
        ...state,
        study_bid_status: payload.education
      }
    case SEND_EVENT_BID_SUCCESS:
      return {
        ...state,
        event_bid_status: payload.event
      }
    case SEND_EVENT_BID_FAIL:
      return {
        ...state,
        event_bid_status: payload.event
      }
    default:
      return state
  }
}