import axios from 'axios'

import {
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAIL,
  SET_SCHEDULE_SUCCESS,
  SET_SCHEDULE_FAIL,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAIL,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAIL,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_FAIL,
  SET_ATTENDANCE_SUCCESS,
  SET_ATTENDANCE_FAIL,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE_FAIL,
} from '../types'

export const load_schedule = () => async dispatch => {
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
        `${process.env.REACT_APP_API_URL}/api/lk/schedules/`,
        config
      )

      dispatch({
        type: GET_SCHEDULE_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: GET_SCHEDULE_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_SCHEDULE_FAIL,
    })
  }
}
export const add_schedule = ev => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const {
    teacher,
    training_group,
    course,
    room,
    start_time,
    end_time,
    guest_star,
    checkpoint,
  } = ev

  const form_data = new FormData()
  form_data.append('teacher', Number(teacher))
  form_data.append('training_group', Number(training_group))
  form_data.append('course', Number(course))
  form_data.append('room', room)
  form_data.append('start_time', start_time)
  form_data.append('end_time', end_time)
  form_data.append('guest_star', guest_star)
  if (checkpoint) {form_data.append('checkpoint', Number(checkpoint))}
  

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/schedules/`,
      form_data,
      config
    )

    dispatch({
      type: SET_SCHEDULE_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_SCHEDULE_FAIL,
    })
  }
}
export const update_schedule = (id, ev) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const {
    teacher,
    training_group,
    course,
    room,
    start_time,
    end_time,
    guest_star,
    checkpoint,
  } = ev

  const form_data = new FormData()
  form_data.append('teacher', Number(teacher))
  form_data.append('training_group', Number(training_group))
  form_data.append('course', Number(course))
  form_data.append('room', room)
  form_data.append('start_time', start_time)
  form_data.append('end_time', end_time)
  form_data.append('guest_star', guest_star)
  form_data.append('checkpoint', Number(checkpoint))

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/schedules/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_SCHEDULE_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_SCHEDULE_FAIL,
    })
  }
}

export const delete_schedule = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/schedules/${id}/`,
      config
    )

    dispatch({
      type: DELETE_SCHEDULE_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_SCHEDULE_FAIL,
    })
  }
}

export const get_attendance = (id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }


  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/lk/schedules/${id}/attendances/`,
      config
    )

    dispatch({
      type: GET_ATTENDANCE_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_ATTENDANCE_FAIL,
    })
  }

}

export const set_attendance = (id, ids) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  const body = JSON.stringify(ids)

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/schedules/${id}/attendances/`,
      body,
      config
    )

    dispatch({
      type: SET_ATTENDANCE_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_ATTENDANCE_FAIL,
    })
  }

}

export const update_attendance =
  (student_id, obj) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    const body = JSON.stringify(obj)

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/lk/students/${student_id}/attendances/`,
        body,
        config
      )

      // console.log(res.data)

      const data = {
        ...obj,
        student: student_id,
      }

      dispatch({
        type: UPDATE_ATTENDANCE_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: UPDATE_ATTENDANCE_FAIL,
      })
    }
  }
