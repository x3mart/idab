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
  DELETE_LK_COURSES_BLOCKS_FAIL,
} from '../../actions/types'

const initialState = {
  lk_courses: [],
  lk_course: {},
  lk_courses_blocks: [],
  lk_courses_block: {},
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_LK_COURSES_SUCCESS:
      return {
        ...state,
        lk_courses: payload,
      }
    case GET_SINGLE_LK_COURSE_SUCCESS:
      return {
        ...state,
        lk_course: payload,
      }
    case SET_LK_COURSES_SUCCESS:
      return {
        ...state,
        lk_courses: [payload, ...state.lk_courses],
      }
    case UPDATE_LK_COURSES_SUCCESS:
      return {
        ...state,
        lk_courses: state.lk_courses.map(item => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_LK_COURSES_SUCCESS:
      return {
        ...state,
        lk_courses: state.lk_courses.filter(item => item.id != payload),
      }
    case GET_LK_COURSES_BLOCKS_SUCCESS:
      return {
        ...state,
        lk_courses_blocks: payload,
      }
    case GET_SINGLE_LK_COURSES_BLOCK_SUCCESS:
      return {
        ...state,
        lk_courses_block: payload,
      }
    case SET_LK_COURSES_BLOCKS_SUCCESS:
      return {
        ...state,
        lk_courses_blocks: [payload, ...state.lk_courses_blocks],
      }
    case UPDATE_LK_COURSES_BLOCKS_SUCCESS:
      return {
        ...state,
        lk_courses_blocks: state.lk_courses_blocks.map(item => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_LK_COURSES_BLOCKS_SUCCESS:
      return {
        ...state,
        lk_courses_blocks: state.lk_courses_blocks.filter(item => item.id != payload),
      }
    case GET_LK_COURSES_FAIL:
    case GET_SINGLE_LK_COURSE_FAIL:
    case SET_LK_COURSES_FAIL:
    case UPDATE_LK_COURSES_FAIL:
    case DELETE_LK_COURSES_FAIL:
    case GET_LK_COURSES_BLOCKS_FAIL:
    case GET_SINGLE_LK_COURSES_BLOCK_FAIL:
    case SET_LK_COURSES_BLOCKS_FAIL:
    case UPDATE_LK_COURSES_BLOCKS_FAIL:
    case DELETE_LK_COURSES_BLOCKS_FAIL:
      return {
        state,
      }
    default:
      return state
  }
}