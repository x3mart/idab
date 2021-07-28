import {
  GET_ALL_TEACHERS_LIST_SUCCESS,
  GET_ALL_TEACHERS_LIST_FAIL,
  GET_ALL_TEACHERS_ID_FAIL,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_DELETE_SUCCESS,
  TEACHER_DELETE_FAIL,
  TEACHERS_ID_LIST_ADD,
  TEACHERS_ID_LIST_REMOVE,
  TEACHERS_ID_LIST_ADD_ALL,
  TEACHERS_ID_LIST_REMOVE_ALL,
  TEACHER_ADD_SUCCESS,
  TEACHER_ADD_FAIL,

} from '../../actions/types'

const initialState = {
  teachers_list:[],
  teachers_ids_list:[],
  teachers_actions_list:[],
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  let {teachers_actions_list} = state

  switch(type) {
    case GET_ALL_TEACHERS_LIST_SUCCESS:
    case TEACHER_ADD_SUCCESS:
      return {
        ...state,
        teachers_list: payload.teachers_list,
        teachers_ids_list: payload.teachers_ids_list
      }
    case TEACHERS_ID_LIST_ADD:
      return {
        ...state,
        teachers_actions_list: teachers_actions_list.includes(payload) ? [...teachers_actions_list] : [...teachers_actions_list, payload]
      }
    case TEACHERS_ID_LIST_REMOVE:
      return {
        ...state,
        teachers_actions_list: teachers_actions_list.filter(item => item !== payload)
      }
    case TEACHERS_ID_LIST_ADD_ALL:
      return {
        ...state,
        teachers_actions_list: payload
      }
    case TEACHERS_ID_LIST_REMOVE_ALL:
      return {
        ...state,
        teachers_actions_list: []
      }
    case GET_ALL_TEACHERS_LIST_FAIL:
    case TEACHER_ADD_FAIL:
      return {
        state
      }
    default:
      return state
  }
}