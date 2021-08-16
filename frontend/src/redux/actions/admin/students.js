import {
  GET_ALL_STUDENTS_LIST_SUCCESS,
  GET_ALL_STUDENTS_LIST_FAIL,
  GET_ALL_STUDENTS_ID_FAIL,
  STUDENT_ADD_SUCCESS,
  STUDENT_ADD_FAIL,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_FAIL,
  STUDENTS_ID_LIST_ADD,
  STUDENTS_ID_LIST_REMOVE,
  STUDENTS_ID_LIST_ADD_ALL,
  STUDENTS_ID_LIST_REMOVE_ALL,
  GET_SPECIALITIES_SUCCESS,
  GET_SPECIALITIES_FAIL,
  GET_PROGRAMS_SUCCESS,
  GET_PROGRAMS_FAIL,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
} from '../types'
import axios from 'axios'

export const get_all_students = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    }

    try {
      // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lk/st/`, config);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/lk/students/`,
        config
      )
      const data = {
        students_list: res.data,
      }
      dispatch({
        type: GET_ALL_STUDENTS_LIST_SUCCESS,
        payload: data,
      })
    } catch (err) {
      dispatch({
        type: GET_ALL_STUDENTS_LIST_FAIL,
      })
    }
  } else {
    dispatch({
      type: GET_ALL_STUDENTS_LIST_FAIL,
    })
  }
}

export const add_student = student => async dispatch => {
  const { name, email, phone, training_group } = student

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  const body = JSON.stringify({ name, email, phone, training_group })

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/lk/students/`,
      body,
      config
    )
    const student = res.data

    dispatch({
      type: STUDENT_ADD_SUCCESS,
      payload: student,
    })
  } catch (err) {
    dispatch({
      type: STUDENT_ADD_FAIL,
    })
  }
}

export const update_student = student => async dispatch => {
  const { id, name, email, phone, training_group } = student

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  const body = JSON.stringify({ name, email, phone, training_group })

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/lk/students/${id}/`,
      body,
      config
    )

    const student = res.data

    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: student,
    })
  } catch (err) {
    dispatch({
      type: STUDENT_UPDATE_FAIL,
    })
  }
}

export const delete_student = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  }

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/students/${id}/`,
      config
    )

    dispatch({
      type: STUDENT_DELETE_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: STUDENT_DELETE_FAIL,
    })
  }
}

export const load_specialities = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/categories/`,
      config
    )
    const data = {
      specialities: res.data,
    }
    dispatch({
      type: GET_SPECIALITIES_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_SPECIALITIES_FAIL,
    })
  }
}

export const load_programs = slug => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/categories/${slug}/`,
      config
    )
    const data = {
      programs: res.data.programs,
    }

    dispatch({
      type: GET_PROGRAMS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_PROGRAMS_FAIL,
    })
  }
}

export const load_groups = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/lk/training_groups/?program=${id}`,
      config
    )
    const data = {
      groups: res.data,
    }

    dispatch({
      type: GET_GROUPS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_GROUPS_FAIL,
    })
  }
}

// export const add_id = (id) => {
//   return dispatch => {
//     dispatch({
//       type: ADD_ROW_ID,
//       payload: id
//     })
//   }
// }
//
// export const remove_id = (id) => {
//   return dispatch => {
//     dispatch({
//       type: DELETE_ROW_ID,
//       payload: id
//     });
//   };
// };
//
// export const add_all_ids = (ids) => {
//   return dispatch => {
//     dispatch({
//       type: ADD_ALL_IDS,
//       payload: ids
//     })
//   }
// }
//
// export const remove_all_ids = () => {
//   return dispatch => {
//     dispatch({
//       type: DELETE_ALL_IDS
//     });
//   };
// };
//
//
