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
  DELETE_LK_COURSES_FAIL
} from '../../actions/types'

const initialState = {
  lk_courses: [],
  lk_course: {},
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case GET_LK_COURSES_SUCCESS:
      return {
        ...state,
        lk_courses: payload.lk_courses
      }
    case GET_SINGLE_LK_COURSE_SUCCESS:
      return {
        ...state,
        lk_course: payload.lk_course
      }
    case GET_LK_COURSES_FAIL:
    case GET_SINGLE_LK_COURSE_FAIL:
    case SET_LK_COURSES_SUCCESS:
    case SET_LK_COURSES_FAIL:
    case UPDATE_LK_COURSES_SUCCESS:
    case UPDATE_LK_COURSES_FAIL:
    case DELETE_LK_COURSES_SUCCESS:
    case DELETE_LK_COURSES_FAIL:
      return {
        state
      }
    default:
      return state
  }
}