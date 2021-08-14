import axios from "axios";

import {
  GET_ABOUT_LEADER_SUCCESS,
  GET_ABOUT_LEADER_FAIL,
  GET_ABOUT_MANAGEMENT_SUCCESS,
  GET_ABOUT_MANAGEMENT_FAIL,
  GET_ABOUT_TEACHERS_SUCCESS,
  GET_ABOUT_TEACHERS_FAIL,
  GET_ABOUT_GALLERY_SUCCESS,
  GET_ABOUT_GALLERY_FAIL,
} from './types'

export const load_about_leader = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/leader/`, config);
      const data = {
        about_leader: res.data[0],
      }
      dispatch({
        type: GET_ABOUT_LEADER_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_ABOUT_LEADER_FAIL
      })
    }
}


export const load_about_management = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/managments/`, config);
      const data = {
        about_management: res.data,
      }
      dispatch({
        type: GET_ABOUT_MANAGEMENT_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_ABOUT_MANAGEMENT_FAIL
      })
    }
}


export const load_about_teachers = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/teachers/`, config);
      const data = {
        about_teachers: res.data,
      }
      dispatch({
        type: GET_ABOUT_TEACHERS_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_ABOUT_TEACHERS_FAIL
      })
    }
}


export const load_about_gallery = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/galleries/`, config);
      const data = {
        about_gallery: res.data,
      }
      dispatch({
        type: GET_ABOUT_GALLERY_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_ABOUT_GALLERY_FAIL
      })
    }
}
