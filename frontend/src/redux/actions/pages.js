import axios from "axios";

import {
  GET_PAGES_SUCCESS,
  GET_PAGES_FAIL,
} from './types'

export const load_pages = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pages/`, config);
      const data = {
        pages: res.data,
      }
      dispatch({
        type: GET_PAGES_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_PAGES_FAIL
      })
    }
}
