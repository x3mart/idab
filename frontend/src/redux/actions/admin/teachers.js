import {
  GET_ALL_TEACHERS_LIST_SUCCESS,
  GET_ALL_TEACHERS_LIST_FAIL,
  GET_ALL_TEACHERS_ID_FAIL,
  TEACHER_ADD_SUCCESS,
  TEACHER_ADD_FAIL,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_DELETE_SUCCESS,
  TEACHER_DELETE_FAIL,
  TEACHERS_ID_LIST_ADD,
  TEACHERS_ID_LIST_REMOVE,
  TEACHERS_ID_LIST_ADD_ALL,
  TEACHERS_ID_LIST_REMOVE_ALL,
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
      const user_id_list = () => {
        let list = []
        if (res) {
          for (let i = 0; i < res.data.length; i++) {
            list.push(res.data[i].id)
          }
        }
        return list
      }
      const data = {
        teachers_list: res.data,
        teachers_ids_list: user_id_list()
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

export const add_student = (student) => async dispatch => {

  const {name, email, password, group} = student

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  const body = JSON.stringify({name, email, password, group});

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/lk/teachers/`, body, config);
    const user_id_list = () => {
      let list = []
      if (res) {
        for (let i = 0; i < res.data.length; i++) {
          list.push(res.data[i].id)
        }
      }
      return list
    }
    const data = {
      teachers_list: res.data,
      teachers_ids_list: user_id_list()
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
}

export const add_id = (id) => {
  if (typeof id === "number") {
    return dispatch => {
      dispatch({
        type: TEACHERS_ID_LIST_ADD,
        payload: id
      })
    }
  } else if (typeof id === "object") {
    return dispatch => {
      dispatch({
        type: TEACHERS_ID_LIST_ADD_ALL,
        payload: id
      })
    }
  }
}

export const remove_id = (id) => {
  if (typeof id === "number") {
    return dispatch => {
      dispatch({
        type: TEACHERS_ID_LIST_REMOVE,
        payload: id
      })
    }
  } else if (typeof id === "object") {
    return dispatch => {
      dispatch({
        type: TEACHERS_ID_LIST_REMOVE_ALL,
      })
    }
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
