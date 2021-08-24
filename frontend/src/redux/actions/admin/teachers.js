import {
  GET_ALL_TEACHERS_LIST_SUCCESS,
  GET_ALL_TEACHERS_LIST_FAIL,
  TEACHER_ADD_SUCCESS,
  TEACHER_ADD_FAIL,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_DELETE_SUCCESS,
  TEACHER_DELETE_FAIL,
} from '../types'
import axios from "axios";

export const get_all_teachers = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lk/teachers/`, config);
      
      const data = {
        teachers_list: res.data
      }
      dispatch({
        type: GET_ALL_TEACHERS_LIST_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_ALL_TEACHERS_LIST_FAIL
      })
    }
  } else {
    dispatch({
      type: GET_ALL_TEACHERS_LIST_FAIL
    });
  }
}

export const add_teacher = (teacher) => async dispatch => {

  const {name, email, phone, avatar} = teacher

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const form_data = new FormData()
  form_data.append('avatar', avatar, avatar.name)
  form_data.append('name', name)
  form_data.append('email', email)
  form_data.append('phone', phone)

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/teachers/`,
      form_data,
      config
    )

    const teacher = res.data
    
    dispatch({
      type: TEACHER_ADD_SUCCESS,
      payload: teacher,
    })
  } catch (err) {
    dispatch({
      type: TEACHER_ADD_FAIL,
    })
  }
}

export const update_teacher = teacher => async dispatch => {
  const { id, name, email, phone, avatar } = teacher

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const form_data = new FormData()
  if (avatar) {form_data.append('avatar', avatar, avatar.name)}
  if (name) {form_data.append('name', name)}
  if (email) {form_data.append('email', email)}
  if (phone) {form_data.append('phone', phone)}
  if (!phone) {form_data.append('phone', '')}
  
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/teachers/${id}/`,
      form_data,
      config
    )

    const teacher = res.data

    dispatch({
      type: TEACHER_UPDATE_SUCCESS,
      payload: teacher,
    })
  } catch (err) {
    dispatch({
      type: TEACHER_UPDATE_FAIL,
    })
  }
}

export const delete_teacher = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/teachers/${id}/`,
      config
    )

    dispatch({
      type: TEACHER_DELETE_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: TEACHER_DELETE_FAIL,
    })
  }
}
