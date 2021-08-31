import axios from 'axios'

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
  DELETE_LK_CATEGORIES_FAIL,
  SET_LK_PROGRAM_SUCCESS,
  SET_LK_PROGRAM_FAIL,
  UPDATE_LK_PROGRAM_SUCCESS,
  UPDATE_LK_PROGRAM_FAIL,
  DELETE_LK_PROGRAM_SUCCESS,
  DELETE_LK_PROGRAM_FAIL,
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
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/lk/categories/`,
        config
      )
      const data = {
        lk_categories: res.data,
      }
      dispatch({
        type: GET_LK_CATEGORIES_SUCCESS,
        payload: data,
      })
    } catch (err) {
      dispatch({
        type: GET_LK_CATEGORIES_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_LK_CATEGORIES_FAIL,
    })
  }
}

export const load_lk_category = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/lk/categories/${id}/`,
      config
    )
    const data = {
      lk_category: res.data,
    }
    dispatch({
      type: GET_SINGLE_LK_CATEGORY_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_SINGLE_LK_CATEGORY_FAIL,
    })
  }
}

export const add_lk_category = category => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { name, image, short_description, full_description, is_active } =
    category

  const form_data = new FormData()
  form_data.append('image', image, image.name)
  form_data.append('name', name)
  form_data.append('short_description', short_description)
  form_data.append('full_description', full_description)
  form_data.append('is_active', is_active)

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/categories/`,
      form_data,
      config
    )

    dispatch({
      type: SET_LK_CATEGORIES_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_LK_CATEGORIES_FAIL,
    })
  }
}

export const update_lk_category = category => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { id, name, image, short_description, full_description, is_active } =
    category

  const form_data = new FormData()
  form_data.append('name', name)
  form_data.append('short_description', short_description)
  form_data.append('full_description', full_description)
  form_data.append('is_active', is_active)
  if (image) {
    form_data.append('image', image, image.name)
  }

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/categories/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_LK_CATEGORIES_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_LK_CATEGORIES_FAIL,
    })
  }
}

export const delete_lk_category = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/categories/${id}/`,
      config
    )

    dispatch({
      type: DELETE_LK_CATEGORIES_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_LK_CATEGORIES_FAIL,
    })
  }
}

export const load_lk_programs_list = () => async dispatch => {
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
        `${process.env.REACT_APP_API_URL}/api/lk/programs/`,
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
      type: GET_LK_PROGRAMS_FAIL,
    })
  }
}

export const load_lk_programs_filtered_list = id => async dispatch => {
  dispatch({
    type: GET_LK_FILTERED_PROGRAMS_SUCCESS,
    payload: id,
  })
}

export const add_lk_program = program => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { name, image, short_description, full_description, is_active, category } =
    program

  const form_data = new FormData()
  form_data.append('image', image, image.name)
  form_data.append('name', name)
  form_data.append('short_description', short_description)
  form_data.append('full_description', full_description)
  form_data.append('category', category)
  form_data.append('is_active', is_active)

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/programs/`,
      form_data,
      config
    )

    dispatch({
      type: SET_LK_PROGRAM_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_LK_PROGRAM_FAIL,
    })
  }
}

export const update_lk_program = program => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { id, name, image, short_description, full_description, is_active } =
    program

  const form_data = new FormData()
  form_data.append('name', name)
  form_data.append('short_description', short_description)
  form_data.append('full_description', full_description)
  form_data.append('is_active', is_active)
  if (image) {
    form_data.append('image', image, image.name)
  }

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/programs/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_LK_PROGRAM_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_LK_PROGRAM_FAIL,
    })
  }
}

export const delete_lk_program = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/programs/${id}/`,
      config
    )

    dispatch({
      type: DELETE_LK_PROGRAM_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_LK_PROGRAM_FAIL,
    })
  }
}
