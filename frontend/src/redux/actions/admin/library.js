import axios from 'axios'

import {
  GET_LIBRARY_SUCCESS,
  GET_LIBRARY_FAIL,
  SET_LIBRARY_ITEM_SUCCESS,
  SET_LIBRARY_ITEM_FAIL,
  UPDATE_LIBRARY_ITEM_SUCCESS,
  UPDATE_LIBRARY_ITEM_FAIL,
  DELETE_LIBRARY_ITEM_SUCCESS,
  DELETE_LIBRARY_ITEM_FAIL,
} from '../types'

export const load_library = () => async dispatch => {
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
        `${process.env.REACT_APP_API_URL}/api/lk/library/`,
        config
      )

      dispatch({
        type: GET_LIBRARY_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: GET_LIBRARY_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_LIBRARY_FAIL,
    })
  }
}
export const add_library_item = book => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { name, description, link} = book

  const form_data = new FormData()
  form_data.append('name', name)
  form_data.append('description', description)
  if (link) {
    form_data.append('link', link)
  }

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/library/`,
      form_data,
      config
    )

    dispatch({
      type: SET_LIBRARY_ITEM_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_LIBRARY_ITEM_FAIL,
    })
  }
}
export const update_library_item = (book) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const {id, name, description, link } = book

  const form_data = new FormData()
  if (name) {
    form_data.append('name', name)
  }
  if (description) {
    form_data.append('description', description)
  }
  if (link) {
    form_data.append('link', link)
  }

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/library/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_LIBRARY_ITEM_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_LIBRARY_ITEM_FAIL,
    })
  }
}
export const delete_library_item = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/library/${id}/`,
      config
    )

    dispatch({
      type: DELETE_LIBRARY_ITEM_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_LIBRARY_ITEM_FAIL,
    })
  }
}
