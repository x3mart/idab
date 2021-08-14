import axios from "axios";

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
} from './types'


export const banner_change_trigger = (val) => dispatch => {
  if (val) {
    dispatch({
      type: TRIGGER_SET_TO_TRUE,
    });
  } else {
    dispatch({
      type: TRIGGER_SET_TO_FALSE,
    });
  }
}


export const section_height = (val) => dispatch => {
  const data = {
    height: val
  }
  if (val > 0) {
    dispatch({
      type: GET_SECTION_HEIGHT_SUCCESS,
      payload: data
    });
  } else {
     dispatch({
      type: GET_SECTION_HEIGHT_FAIL,
    });
  }
}


export const navbar_height = (val) => dispatch => {
  const data = {
    height: val + 40
  }
  if (val > 0) {
    dispatch({
      type: GET_NAVBAR_HEIGHT_SUCCESS,
      payload: data
    });
  } else {
     dispatch({
      type: GET_NAVBAR_HEIGHT_FAIL,
    });
  }
}


export const load_home_testimonials = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/`, config);
      const data = {
        home_testimonials: res.data,
      }
      dispatch({
        type: GET_HOME_TESTIMONIALS_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_HOME_TESTIMONIALS_FAIL
      })
    }
}


export const load_home_faq = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/faqs/`, config);
      const data = {
        home_faq: res.data,
      }
      dispatch({
        type: GET_HOME_FAQ_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_HOME_FAQ_FAIL
      })
    }
}


export const load_contacts = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts/1/`, config);
      const data = {
        contacts: res.data,
      }
      dispatch({
        type: GET_CONTACTS_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_CONTACTS_FAIL
      })
    }
}
