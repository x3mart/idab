import {
  GET_LK_CATEGORIES_SUCCESS,
  GET_LK_CATEGORIES_FAIL,
  GET_LK_PROGRAMS_SUCCESS,
  GET_LK_PROGRAMS_FAIL,
  GET_SINGLE_LK_CATEGORY_SUCCESS,
  GET_SINGLE_LK_CATEGORY_FAIL,
  SET_LK_CATEGORIES_SUCCESS,
  SET_LK_CATEGORIES_FAIL,
  UPDATE_LK_CATEGORIES_SUCCESS,
  UPDATE_LK_CATEGORIES_FAIL,
  DELETE_LK_CATEGORIES_SUCCESS,
  DELETE_LK_CATEGORIES_FAIL,
  GET_LK_FILTERED_PROGRAMS_SUCCESS,
  SET_LK_PROGRAM_SUCCESS,
  SET_LK_PROGRAM_FAIL,
  UPDATE_LK_PROGRAM_SUCCESS,
  UPDATE_LK_PROGRAM_FAIL,
  DELETE_LK_PROGRAM_SUCCESS,
  DELETE_LK_PROGRAM_FAIL,
} from '../../actions/types'

const initialState = {
  lk_categories: [],
  lk_category: {},
  lk_programs: [],
  lk_program: {},
}

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_LK_CATEGORIES_SUCCESS:
      return {
        ...state,
        lk_categories: payload.lk_categories,
      }
    case SET_LK_CATEGORIES_SUCCESS:
      return {
        ...state,
        lk_categories: [payload, ...state.lk_categories],
      }
    case UPDATE_LK_CATEGORIES_SUCCESS:
      return {
        ...state,
        lk_categories: state.lk_categories.map(item => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_LK_CATEGORIES_SUCCESS:
      return {
        ...state,
        lk_categories: state.lk_categories.filter(item => item.id !== payload),
      }
    case GET_LK_PROGRAMS_SUCCESS:
      return {
        ...state,
        lk_programs: payload.lk_programs,
      }
    case GET_LK_FILTERED_PROGRAMS_SUCCESS:
      return {
        ...state,
        lk_programs: state.lk_programs.filter(item => item.category == payload),
      }
    case SET_LK_PROGRAM_SUCCESS:
      return {
        ...state,
        lk_programs: [payload, ...state.lk_programs],
      }
    case UPDATE_LK_PROGRAM_SUCCESS:
      return {
        ...state,
        lk_programs: state.lk_programs.map(item => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_LK_PROGRAM_SUCCESS:
      return {
        ...state,
        lk_programs: state.lk_programs.filter(item => item.id !== payload),
      }
    case GET_SINGLE_LK_CATEGORY_SUCCESS:
      return {
        ...state,
        lk_category: payload.lk_category,
      }
    case GET_LK_CATEGORIES_FAIL:
    case GET_SINGLE_LK_CATEGORY_FAIL:
    case SET_LK_CATEGORIES_FAIL:
    case UPDATE_LK_CATEGORIES_FAIL:
    case DELETE_LK_CATEGORIES_SUCCESS:
    case DELETE_LK_CATEGORIES_FAIL:
      return {
        state,
      }
    default:
      return state
  }
}