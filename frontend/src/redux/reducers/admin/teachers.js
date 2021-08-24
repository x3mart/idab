import {
  GET_ALL_TEACHERS_LIST_SUCCESS,
  GET_ALL_TEACHERS_LIST_FAIL,
  TEACHER_ADD_SUCCESS,
  TEACHER_ADD_FAIL,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_DELETE_SUCCESS,
  TEACHER_DELETE_FAIL,
} from '../../actions/types'

const initialState = {
  teachers_list: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_TEACHERS_LIST_SUCCESS:
      return {
        ...state,
        teachers_list: payload.teachers_list,
      }
    case TEACHER_ADD_SUCCESS:
      return {
        ...state,
        teachers_list: [payload, ...state.teachers_list],
      }
    case TEACHER_UPDATE_SUCCESS:
      return {
        ...state,
        teachers_list: state.teachers_list.map(item => {
          if (item.id == payload.id) {
            return payload
          }
          return item
        }),
      }
    case TEACHER_DELETE_SUCCESS:
      return {
        ...state,
        teachers_list: state.teachers_list.filter(item => item.id !== payload),
      }

    case GET_ALL_TEACHERS_LIST_FAIL:
    case TEACHER_ADD_FAIL:
      return {
        state,
      }
    default:
      return state
  }
}
