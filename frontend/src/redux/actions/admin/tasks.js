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
  ADD_SOLUTION_SUCCESS,
  ADD_SOLUTION_FAIL,
  ADD_MARK_SUCCESS,
  ADD_MARK_FAIL,
} from '../types'

export const load_tasks = (id) => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    let url = id ? `${process.env.REACT_APP_API_URL}/api/lk/tasks/?training_group=${id}` : `${process.env.REACT_APP_API_URL}/api/lk/tasks/`

    try {
      const res = await axios.get(
        url,
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

  const { teacher, training_group, students, name, description, file } = task

  const form_data = new FormData()
  form_data.append('teacher', teacher)
  form_data.append('training_group', training_group)
  form_data.append('students', students)
  form_data.append('name', name)
  form_data.append('description', description)
  file && form_data.append('file', file, file.name)

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/tasks/`,
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
      `${process.env.REACT_APP_API_URL}/api/lk/tasks/${id}/`,
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
      `${process.env.REACT_APP_API_URL}/api/lk/tasks/${id}/`,
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

export const add_solution = (task) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { id, description, file } = task

  const form_data = new FormData()

  if (description) {
    form_data.append('description', description)
  }
  if (file) {
    form_data.append('file', file, file.name)
  }

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/tasks/${id}/solution/`,
      form_data,
      config
    )

    dispatch({
      type: ADD_SOLUTION_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: ADD_SOLUTION_FAIL,
    })
  }
}

export const add_mark = (solution) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { student_id, id, mark, task_id } = solution

  const form_data = new FormData()

  if (mark) {
    form_data.append('mark', mark)
  }

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/solutions/${id}/`,
      form_data,
      config
    )

    let payload = {solution_id: id, data: res.data, student_id: student_id,
      task_id: task_id}

    dispatch({
      type: ADD_MARK_SUCCESS,
      payload: payload,
    })
  } catch (err) {
    dispatch({
      type: ADD_MARK_FAIL,
    })
  }
}

