import axios from 'axios'

import {
  GET_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  SET_TASK_SUCCESS,
  SET_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  GET_SOLUTIONS_SUCCESS,
  GET_SOLUTIONS_FAIL,
  SET_SOLUTION_SUCCESS,
  SET_SOLUTION_FAIL,
  UPDATE_SOLUTION_SUCCESS,
  UPDATE_SOLUTION_FAIL,
  DELETE_SOLUTION_SUCCESS,
  DELETE_SOLUTION_FAIL,
} from '../types'

export const load_tasks = () => async dispatch => {
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
        `${process.env.REACT_APP_API_URL}/api/lk/task/`,
        config
      )

      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: GET_TASKS_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_TASKS_FAIL,
    })
  }
}
export const add_task = task => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const {name, description, file } = task

  const form_data = new FormData()
  form_data.append('name', name)
  form_data.append('description', description)
  form_data.append('file', file, file.name)

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/task/`,
      form_data,
      config
    )

    dispatch({
      type: SET_TASK_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_TASK_FAIL,
    })
  }
}
export const update_task = (task) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { id, name, description, file } = task

  const form_data = new FormData()
  if (name) {
    form_data.append('name', name)
  }
  if (description) {
    form_data.append('description', description)
  }
  if (file) {
    form_data.append('file', file, file.name)
  }

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/task/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_TASK_FAIL,
    })
  }
}
export const delete_task = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/task/${id}/`,
      config
    )

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_TASK_FAIL,
    })
  }
}





export const load_solutions = () => async dispatch => {
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
        `${process.env.REACT_APP_API_URL}/api/lk/task/`,
        config
      )

      dispatch({
        type: GET_SOLUTIONS_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: GET_SOLUTIONS_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_SOLUTIONS_FAIL,
    })
  }
}
export const add_solution = task => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { name, description, url, file } = task

  const form_data = new FormData()
  form_data.append('name', name)
  form_data.append('description', description)
  if (url) {
    form_data.append('url', url)
  }
  if (file) {
    form_data.append('file', file, file.name)
  }

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/solution/`,
      form_data,
      config
    )

    dispatch({
      type: SET_SOLUTION_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_SOLUTION_FAIL,
    })
  }
}
export const update_solution = (id, task) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { name, description, url, file } = task

  const form_data = new FormData()
  if (name) {
    form_data.append('name', name)
  }
  if (description) {
    form_data.append('description', description)
  }
  if (url) {
    form_data.append('url', url)
  }
  if (file) {
    form_data.append('file', file, file.name)
  }

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/solution/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_SOLUTION_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_SOLUTION_FAIL,
    })
  }
}
export const delete_solution = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/solution/${id}/`,
      config
    )

    dispatch({
      type: DELETE_SOLUTION_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_SOLUTION_FAIL,
    })
  }
}
