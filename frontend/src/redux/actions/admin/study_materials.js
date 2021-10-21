import axios from 'axios'

import {
  GET_STUDY_MATERIALS_SUCCESS,
  GET_STUDY_MATERIALS_FAIL,
  SET_STUDY_MATERIAL_SUCCESS,
  SET_STUDY_MATERIAL_FAIL,
  UPDATE_STUDY_MATERIAL_SUCCESS,
  UPDATE_STUDY_MATERIAL_FAIL,
  DELETE_STUDY_MATERIAL_SUCCESS,
  DELETE_STUDY_MATERIAL_FAIL,
} from '../types'

export const load_study_materials = () => async dispatch => {
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
        `${process.env.REACT_APP_API_URL}/api/lk/study_materials/`,
        config
      )

      dispatch({
        type: GET_STUDY_MATERIALS_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: GET_STUDY_MATERIALS_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_STUDY_MATERIALS_FAIL,
    })
  }
}
export const add_study_material = material => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { name, description, file, training_groups } = material

  const form_data = new FormData()
  form_data.append('training_groups', training_groups)
  form_data.append('name', name)
  form_data.append('description', description)
  if (file) {
    form_data.append('file', file, file.name)
  }

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/study_materials/`,
      form_data,
      config
    )

    dispatch({
      type: SET_STUDY_MATERIAL_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_STUDY_MATERIAL_FAIL,
    })
  }
}
export const update_study_material = (material) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  const { id, name, description, file, training_groups } = material

  const form_data = new FormData()
  if (name) {
    form_data.append('name', name)
  }
  if (description) {
    form_data.append('description', description)
  }
  if (training_groups) {
    form_data.append('training_groups', training_groups)
  }
  if (file) {
    form_data.append('file', file, file.name)
  }

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/study_materials/${id}/`,
      form_data,
      config
    )

    dispatch({
      type: UPDATE_STUDY_MATERIAL_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_STUDY_MATERIAL_FAIL,
    })
  }
}
export const delete_study_material = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/study_materials/${id}/`,
      config
    )

    dispatch({
      type: DELETE_STUDY_MATERIAL_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: DELETE_STUDY_MATERIAL_FAIL,
    })
  }
}
