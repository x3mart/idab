import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from '../actions/types'

const initialState = {
  categories: [],
  category: {},
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories
      }
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        categories: {}
      }
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: payload.category
      }
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        category: {}
      }
    default:
      return state
  }
}