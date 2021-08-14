import {
  GET_LK_CATEGORIES_SUCCESS,
  GET_LK_CATEGORIES_FAIL,
  GET_SINGLE_LK_CATEGORY_SUCCESS,
  GET_SINGLE_LK_CATEGORY_FAIL,
  SET_LK_CATEGORIES_SUCCESS,
  SET_LK_CATEGORIES_FAIL,
  UPDATE_LK_CATEGORIES_SUCCESS,
  UPDATE_LK_CATEGORIES_FAIL,
  DELETE_LK_CATEGORIES_SUCCESS,
  DELETE_LK_CATEGORIES_FAIL
} from '../../actions/types'

const initialState = {
  lk_categories: [],
  lk_category: {},
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case GET_LK_CATEGORIES_SUCCESS:
      return {
        ...state,
        lk_categories: payload.lk_categories
      }
    case GET_SINGLE_LK_CATEGORY_SUCCESS:
      return {
        ...state,
        lk_category: payload.lk_category
      }
    case GET_LK_CATEGORIES_FAIL:
    case GET_SINGLE_LK_CATEGORY_FAIL:
    case SET_LK_CATEGORIES_SUCCESS:
    case SET_LK_CATEGORIES_FAIL:
    case UPDATE_LK_CATEGORIES_SUCCESS:
    case UPDATE_LK_CATEGORIES_FAIL:
    case DELETE_LK_CATEGORIES_SUCCESS:
    case DELETE_LK_CATEGORIES_FAIL:
      return {
        state
      }
    default:
      return state
  }
}