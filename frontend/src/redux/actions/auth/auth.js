import axios from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  STATUS_RESET,
} from '../types'

export const load_user = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    function parseJwt(token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      return JSON.parse(jsonPayload)
    }

    const user = parseJwt(localStorage.getItem('access'))

    try {
      const res = await axios.get(
        `${
          user.is_student
            ? 'https://idab.mba/api/lk/students/' + user.user_id + '/'
            : user.is_teacher
            ? 'https://idab.mba/api/lk/teachers/' + user.user_id + '/'
            : 'https://idab.mba/auth/users/me/'
        }`,
        config
      )
      // const res = await axios.get(`https://idab.mba/auth/users/me/`, config)

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      })
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    })
  }
}
export const update_user = data => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    }

    const {
      name,
      email,
      birthday,
      sex,
      phone,
      adress,
      avatar,
      company,
      position,
      short_position,
      full_position,
      description,
      link,
      on_site,
    } = data

    const form_data = new FormData()
    if (avatar) {
      form_data.append('avatar', avatar, avatar.name)
    }
    if (name) {
      form_data.append('name', name)
    }
    if (email) {
      form_data.append('email', email)
    }
    if (birthday) {
      form_data.append('birthday', birthday)
    }
    if (sex) {
      form_data.append('sex', sex)
    }
    if (phone) {
      form_data.append('phone', phone)
    }
    if (adress) {
      form_data.append('adress', adress)
    }
    if (avatar) {
      form_data.append('avatar', avatar)
    }
    if (company) {
      form_data.append('company', company)
    }
    if (position) {
      form_data.append('position', position)
    }
    if (short_position) {
      form_data.append('short_position', short_position)
    }
    if (full_position) {
      form_data.append('full_position', full_position)
    }
    if (description) {
      form_data.append('description', description)
    }
    if (link) {
      form_data.append('link', link)
    }
    if (on_site) {
      form_data.append('on_site', on_site)
    }

    try {
      const res = await axios.patch(
        `https://idab.mba/auth/users/me/`,
        form_data,
        config
      )

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: USER_UPDATE_FAIL,
      })
    }
  } else {
    dispatch({
      type: USER_UPDATE_FAIL,
    })
  }
}

export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const body = JSON.stringify({ token: localStorage.getItem('access') })

    try {
      const res = await axios.post(
        `https://idab.mba/auth/jwt/verify/`,
        body,
        config
      )


      if (res.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        })
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        })
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      })
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    })
  }
}

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    // const res = await axios.post(`https://idab.mba/auth/jwt/create/`, body, config);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    )

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(load_user())
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.detail,
    })
  }
}

export const signup =
  (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    })

    try {
      const res = await axios.post(`https://idab.mba/auth/users/`, body, config)

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      })
    }
  }

export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ uid, token })

  try {
    await axios.post(`https://idab.mba/auth/users/activation/`, body, config)

    dispatch({
      type: ACTIVATION_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    })
  }
}

export const reset_password = email => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email })

  try {
    const res = await axios.post(
      `https://idab.mba/auth/users/reset_password/`,
      body,
      config
    )


    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: res.status
    })
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    })
  }
}
export const reset_status = () => dispatch => {
 dispatch({
   type: STATUS_RESET
 })
}

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password })

    try {
      await axios.post(
        `https://idab.mba/auth/users/reset_password_confirm/`,
        body,
        config
      )

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      })
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      })
    }
  }

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  })
}
