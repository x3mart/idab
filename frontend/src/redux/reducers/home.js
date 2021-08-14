import {
  TRIGGER_SET_TO_TRUE,
  TRIGGER_SET_TO_FALSE,
  GET_SECTION_HEIGHT_SUCCESS,
  GET_SECTION_HEIGHT_FAIL,
  GET_NAVBAR_HEIGHT_SUCCESS,
  GET_NAVBAR_HEIGHT_FAIL,
  GET_HOME_TESTIMONIALS_SUCCESS,
  GET_HOME_TESTIMONIALS_FAIL,
  GET_HOME_FAQ_SUCCESS,
  GET_HOME_FAQ_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
} from '../actions/types'

const initialState = {
  banner_trigger: false,
  section_height: 0,
  navbar_height: 0,
  home_testimonials: [],
  home_faq: [],
  contacts: {},
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case TRIGGER_SET_TO_TRUE:
      return {
        ...state,
        banner_trigger: true
      }
    case TRIGGER_SET_TO_FALSE:
      return {
        ...state,
        banner_trigger: false
      }
    case GET_SECTION_HEIGHT_SUCCESS:
      return {
        ...state,
        section_height: payload.height
      }
    case GET_SECTION_HEIGHT_FAIL:
      return {
        ...state,
        section_height: 0
      }
    case GET_NAVBAR_HEIGHT_SUCCESS:
      return {
        ...state,
        navbar_height: payload.height
      }
    case GET_NAVBAR_HEIGHT_FAIL:
      return {
        ...state,
        navbar_height: 0
      }
    case GET_HOME_TESTIMONIALS_SUCCESS:
      return {
        ...state,
        home_testimonials: payload.home_testimonials
      }
    case GET_HOME_TESTIMONIALS_FAIL:
      return {
        ...state,
        home_testimonials: []
      }
    case GET_HOME_FAQ_SUCCESS:
      return {
        ...state,
        home_faq: payload.home_faq
      }
    case GET_HOME_FAQ_FAIL:
      return {
        ...state,
        home_faq: []
      }
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: payload.contacts
      }
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        contacts: []
      }
    default:
      return state
  }
}