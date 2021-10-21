import axios from "axios";

import {
  GET_LK_COURSES_SUCCESS,
  GET_LK_COURSES_FAIL,
  GET_SINGLE_LK_COURSE_SUCCESS,
  GET_SINGLE_LK_COURSE_FAIL,
  SET_LK_COURSES_SUCCESS,
  SET_LK_COURSES_FAIL,
  UPDATE_LK_COURSES_SUCCESS,
  UPDATE_LK_COURSES_FAIL,
  DELETE_LK_COURSES_SUCCESS,
  DELETE_LK_COURSES_FAIL,
  GET_LK_COURSES_BLOCKS_SUCCESS,
  GET_LK_COURSES_BLOCKS_FAIL,
  GET_SINGLE_LK_COURSES_BLOCK_SUCCESS,
  GET_SINGLE_LK_COURSES_BLOCK_FAIL,
  SET_LK_COURSES_BLOCKS_SUCCESS,
  SET_LK_COURSES_BLOCKS_FAIL,
  UPDATE_LK_COURSES_BLOCKS_SUCCESS,
  UPDATE_LK_COURSES_BLOCKS_FAIL,
  DELETE_LK_COURSES_BLOCKS_SUCCESS,
  DELETE_LK_COURSES_BLOCKS_FAIL
} from '../types'


export const load_lk_courses_list = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lk/courses/`, config);
    const data = {
      lk_courses: res.data,
    }
    dispatch({
      type: GET_LK_COURSES_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: GET_LK_COURSES_FAIL
    })
  }
}


export const load_lk_course = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lk/courses/${id}/`, config);
    const data = {
      lk_course: res.data,
    }
    dispatch({
      type: GET_SINGLE_LK_COURSE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: GET_SINGLE_LK_COURSE_FAIL
    })
  }
}


export const set_course = (name, hours, blocks, teachers, is_active) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, hours, blocks, teachers, is_active});

    try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/lk/courses/`,
          body,
          config
        )

        dispatch({
            type: SET_LK_COURSES_SUCCESS,
            payload: res.data
        });
        dispatch(load_lk_courses_list());
    } catch (err) {
        dispatch({
            type: SET_LK_COURSES_FAIL,
        })
    }
};


export const update_course =
  (id, name, hours, blocks, teachers, is_active) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ name, hours, blocks, teachers, is_active })

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/lk/courses/${id}`,
        body,
        config
      )

      dispatch({
        type: UPDATE_LK_COURSES_SUCCESS,
        payload: res.data
      })
      dispatch(load_lk_courses_list())
    } catch (err) {
      dispatch({
        type: UPDATE_LK_COURSES_FAIL,
      })
    }
  }


export const delete_course = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/courses/${id}/`,
      config
    )

    dispatch({
      type: DELETE_LK_COURSES_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: DELETE_LK_COURSES_FAIL,
    })
  }
}

export const load_lk_courses_blocks_list = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/lk/courses_blocks/`,
      config
    )
    
    dispatch({
      type: GET_LK_COURSES_BLOCKS_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_LK_COURSES_BLOCKS_FAIL,
    })
  }
}

export const load_lk_courses_block = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/lk/courses_blocks/${id}/`,
      config
    )
    
    dispatch({
      type: GET_SINGLE_LK_COURSES_BLOCK_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_SINGLE_LK_COURSES_BLOCK_FAIL,
    })
  }
}

export const set_courses_block =
  (name, hours, blocks, teachers, is_active) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ name, hours, blocks, teachers, is_active })

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/lk/courses_blocks/`,
        body,
        config
      )

      dispatch({
        type: SET_LK_COURSES_BLOCKS_SUCCESS,
      })
    } catch (err) {
      dispatch({
        type: SET_LK_COURSES_BLOCKS_FAIL,
      })
    }
  }

export const update_courses_block =
  (id, name, hours, blocks, teachers, is_active) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ name, hours, blocks, teachers, is_active })

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/lk/courses_blocks/${id}`,
        body,
        config
      )

      dispatch({
        type: UPDATE_LK_COURSES_BLOCKS_SUCCESS,
      })
      dispatch(load_lk_courses_list())
    } catch (err) {
      dispatch({
        type: UPDATE_LK_COURSES_BLOCKS_FAIL,
      })
    }
  }

export const delete_courses_block = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/lk/courses_blocks/${id}/`,
      config
    )

    dispatch({
      type: DELETE_LK_COURSES_BLOCKS_SUCCESS,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: DELETE_LK_COURSES_BLOCKS_FAIL,
    })
  }
}


