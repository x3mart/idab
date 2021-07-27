import axios from "axios";

import {
  GET_SINGLE_EVENT_SUCCESS,
  GET_SINGLE_EVENT_FAIL,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
} from './types'


export const load_event = (id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${id}/`, config);
    const data = {
      single_event: res.data,
    }
    dispatch({
      type: GET_SINGLE_EVENT_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: GET_SINGLE_EVENT_FAIL
    })
  }
}

export const load_events = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/`, config);
    const data = {
      events: res.data,
    }
    dispatch({
      type: GET_EVENTS_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: GET_EVENTS_FAIL
    })
  }
}

