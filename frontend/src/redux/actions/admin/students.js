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
} from '../types'
import axios from "axios";

export const get_all_students = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lk/students/`, config);
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
        students_list: res.data,
        students_ids_list: user_id_list()
      }
      dispatch({
        type: GET_ALL_STUDENTS_LIST_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_ALL_STUDENTS_LIST_FAIL
      })
    }
  } else {
    dispatch({
      type: GET_ALL_STUDENTS_LIST_FAIL
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
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/lk/students/`, body, config);
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
      students_list: res.data,
      students_ids_list: user_id_list()
    }
    dispatch({
      type: GET_ALL_STUDENTS_LIST_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: GET_ALL_STUDENTS_LIST_FAIL
    })
  }
}

export const add_id = (id) => {
  if (typeof id === "number") {
    return dispatch => {
      dispatch({
        type: STUDENTS_ID_LIST_ADD,
        payload: id
      })
    }
  } else if (typeof id === "object") {
    return dispatch => {
      dispatch({
        type: STUDENTS_ID_LIST_ADD_ALL,
        payload: id
      })
    }
  }
}

export const remove_id = (id) => {
  if (typeof id === "number") {
    return dispatch => {
      dispatch({
        type: STUDENTS_ID_LIST_REMOVE,
        payload: id
      })
    }
  } else if (typeof id === "object") {
    return dispatch => {
      dispatch({
        type: STUDENTS_ID_LIST_REMOVE_ALL,
      })
    }
  }
}

export const load_specialities = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/`, config);
      const data = {
        specialities: res.data,
      }
      dispatch({
        type: GET_SPECIALITIES_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_SPECIALITIES_FAIL
      })
    }
}

export const load_programs = (slug) => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/${slug}/`, config);
      const data = {
        programs: res.data.programs,
      }

      console.log('programs: ', data)

      dispatch({
        type: GET_PROGRAMS_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_PROGRAMS_FAIL
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
