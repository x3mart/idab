import axios from "axios";

import {
  GET_PROGRAM_SUCCESS,
  GET_PROGRAM_FAIL,
} from './types'

export const load_program = (slug) => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/programs/${slug}/`, config);
      const data = {
        program: res.data,
      }
      dispatch({
        type: GET_PROGRAM_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_PROGRAM_FAIL
      })
    }
}
