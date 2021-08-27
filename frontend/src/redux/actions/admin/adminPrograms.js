import axios from "axios";

import {
  GET_LK_CATEGORIES_SUCCESS,
  GET_LK_CATEGORIES_FAIL,
  GET_LK_PROGRAMS_SUCCESS,
  GET_LK_PROGRAMS_FAIL,
  GET_SINGLE_LK_CATEGORY_SUCCESS,
  GET_SINGLE_LK_CATEGORY_FAIL,
  SET_LK_CATEGORIES_SUCCESS,
  SET_LK_CATEGORIES_FAIL,
  UPDATE_LK_CATEGORIES_SUCCESS,
  UPDATE_LK_CATEGORIES_FAIL,
  DELETE_LK_CATEGORIES_SUCCESS,
  DELETE_LK_CATEGORIES_FAIL
} from '../types'


export const load_lk_categories_list = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lk/categories/`, config);
    const data = {
      lk_categories: res.data,
    }
    dispatch({
      type: GET_LK_CATEGORIES_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: GET_LK_CATEGORIES_FAIL
    })
  }
  } else {
    dispatch({
      type: GET_LK_CATEGORIES_FAIL
    })
  }
}


export const load_lk_category = slug => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lk/categories/${slug}/`, config);
    const data = {
      lk_category: res.data,
    }
    dispatch({
      type: GET_SINGLE_LK_CATEGORY_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: GET_SINGLE_LK_CATEGORY_FAIL
    })
  }
}


export const set_lk_category = (name, short_description, full_description, number, slug, is_active) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, short_description, full_description, number, slug, is_active});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/lk/categories/`, body, config);

        dispatch({
            type: SET_LK_CATEGORIES_SUCCESS,
        });
        dispatch(load_lk_categories_list());
    } catch (err) {
        dispatch({
            type: SET_LK_CATEGORIES_FAIL,
        })
    }
};


export const update_lk_category = (category_slug, name, short_description, full_description, number, slug, is_active) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, short_description, full_description, number, slug, is_active});

    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/lk/categories/${category_slug}`, body, config);

        dispatch({
            type: UPDATE_LK_CATEGORIES_SUCCESS,
        });
        dispatch(load_lk_categories_list());
    } catch (err) {
        dispatch({
            type: UPDATE_LK_CATEGORIES_FAIL,
        })
    }
};


export const delete_lk_category = slug => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/lk/categories/${slug}/`, config);

    dispatch({
      type: DELETE_LK_CATEGORIES_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: DELETE_LK_CATEGORIES_FAIL
    })
  }
}


export const load_lk_programs_list = (slug) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/lk/categories/${slug}/`,
        config
      )
      const data = {
        lk_programs: res.data,
      }
      dispatch({
        type: GET_LK_PROGRAMS_SUCCESS,
        payload: data,
      })
    } catch (err) {
      dispatch({
        type: GET_LK_PROGRAMS_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_LK_programs_FAIL,
    })
  }
}


