import axios from 'axios'

import {
  GET_BASIC_GROUPS_SUCCESS,
  GET_BASIC_GROUPS_FAIL,
  SET_BASIC_GROUP_SUCCESS,
  SET_BASIC_GROUP_FAIL,
  UPDATE_BASIC_GROUP_SUCCESS,
  UPDATE_BASIC_GROUP_FAIL,
  DELETE_BASIC_GROUP_SUCCESS,
  DELETE_BASIC_GROUP_FAIL,
  GET_LK_GROUPS_SUCCESS,
  GET_LK_GROUPS_FAIL,
  SET_GROUP_SUCCESS,
  SET_GROUP_FAIL,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL,
} from '../types'

export const load_basic_groups_list = () => async dispatch => {
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
        `${process.env.REACT_APP_API_URL}/api/lk/training_group_basics/`,
        config
      )

      dispatch({
        type: GET_BASIC_GROUPS_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: GET_BASIC_GROUPS_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_BASIC_GROUPS_FAIL,
    })
  }
}
export const add_basic_group = basic_group => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { name, category } = basic_group

  const form_data = new FormData()
  form_data.append('name', name)
  form_data.append('category', category)

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/training_group_basics/`,
      form_data,
      config
    )

    dispatch({
      type: SET_BASIC_GROUP_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_BASIC_GROUP_FAIL,
    })
  }
}
export const update_basic_group = basic_group => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { id, name, category } = basic_group

  const form_data = new FormData()
  form_data.append('name', name)
  form_data.append('category', category)

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/training_group_basics/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_BASIC_GROUP_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_BASIC_GROUP_FAIL,
    })
  }
}
export const delete_basic_group = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/training_group_basics/${id}/`,
      config
    )

    dispatch({
      type: DELETE_BASIC_GROUP_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_BASIC_GROUP_FAIL,
    })
  }
}
export const load_groups_list = () => async dispatch => {
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
        `${process.env.REACT_APP_API_URL}/api/lk/training_groups/`,
        config
      )

      dispatch({
        type: GET_LK_GROUPS_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: GET_LK_GROUPS_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_LK_GROUPS_FAIL,
    })
  }
}
export const add_group = group => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { start_date, graduation_date, basic } = group

  const form_data = new FormData()
  form_data.append('start_date', start_date)
  form_data.append('graduation_date', graduation_date)
  form_data.append('basic', basic)

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/training_groups/`,
      form_data,
      config
    )

    dispatch({
      type: SET_GROUP_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_GROUP_FAIL,
    })
  }
}
export const update_group = group => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { start_date, graduation_date, basic_id } = group

  const form_data = new FormData()
  form_data.append('start_date', start_date)
  form_data.append('graduation_date', graduation_date)
  form_data.append('basic', basic_id)

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/training_groups/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_GROUP_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_GROUP_FAIL,
    })
  }
}
export const delete_group = (id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/training_groups/${id}/`,
      config
    )

    dispatch({
      type: DELETE_GROUP_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_GROUP_FAIL,
    })
  }
}




