import {
  GET_LIBRARY_SUCCESS,
  GET_LIBRARY_FAIL,
  SET_LIBRARY_ITEM_SUCCESS,
  SET_LIBRARY_ITEM_FAIL,
  UPDATE_LIBRARY_ITEM_SUCCESS,
  UPDATE_LIBRARY_ITEM_FAIL,
  DELETE_LIBRARY_ITEM_SUCCESS,
  DELETE_LIBRARY_ITEM_FAIL,
} from '../../actions/types'

const initialState = {
  library: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_LIBRARY_SUCCESS:
      return {
        ...state,
        library: payload,
      }
    case SET_LIBRARY_ITEM_SUCCESS:
      return {
        ...state,
        library: [payload, ...state.library],
      }
    case UPDATE_LIBRARY_ITEM_SUCCESS:
      return {
        ...state,
        library: state.library.map(item => {
          if (item.id == payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_LIBRARY_ITEM_SUCCESS:
      return {
        ...state,
        library: state.library.filter(item => item.id !== payload),
      }

    case GET_LIBRARY_FAIL:
    case SET_LIBRARY_ITEM_FAIL:
    case UPDATE_LIBRARY_ITEM_FAIL:
    case DELETE_LIBRARY_ITEM_FAIL:
      return {
        state,
      }
    default:
      return state
  }
}
