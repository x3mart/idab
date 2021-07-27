import axios from "axios";

import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from './types'

export const load_categories = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/`, config);
      const data = {
        categories: res.data,
      }
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_CATEGORIES_FAIL
      })
    }
}


export const load_category = (slug) => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/${slug}/`, config);
      const data = {
        category: res.data,
      }

      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_CATEGORY_FAIL
      })
    }
}
