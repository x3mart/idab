import {
  GET_ALL_STUDENTS_LIST_SUCCESS,
  GET_ALL_STUDENTS_LIST_FAIL,
  GET_ALL_STUDENTS_ID_FAIL,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_FAIL,
  STUDENTS_ID_LIST_ADD,
  STUDENTS_ID_LIST_REMOVE,
  STUDENTS_ID_LIST_ADD_ALL,
  STUDENTS_ID_LIST_REMOVE_ALL,
  STUDENT_ADD_SUCCESS,
  STUDENT_ADD_FAIL,
  GET_SPECIALITIES_SUCCESS,
  GET_SPECIALITIES_FAIL,
  GET_PROGRAMS_SUCCESS,
  GET_PROGRAMS_FAIL,

} from '../../actions/types'

const initialState = {
  students_list:[],
  students_ids_list:[],
  students_actions_list:[],
  specialities:[],
  programs:[],
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  let {students_actions_list} = state

  switch(type) {
    case GET_ALL_STUDENTS_LIST_SUCCESS:
    case STUDENT_ADD_SUCCESS:
      return {
        ...state,
        students_list: payload.students_list,
        students_ids_list: payload.students_ids_list
      }
    case STUDENTS_ID_LIST_ADD:
      return {
        ...state,
        students_actions_list: students_actions_list.includes(payload) ? [...students_actions_list] : [...students_actions_list, payload]
      }
    case STUDENTS_ID_LIST_REMOVE:
      return {
        ...state,
        students_actions_list: students_actions_list.filter(item => item !== payload)
      }
    case GET_SPECIALITIES_SUCCESS:
      return {
        ...state,
        specialities: payload.specialities
      }
    case GET_PROGRAMS_SUCCESS:
      return {
        ...state,
        programs: payload.programs
      }
    case STUDENTS_ID_LIST_ADD_ALL:
      return {
        ...state,
        students_actions_list: payload
      }
    case STUDENTS_ID_LIST_REMOVE_ALL:
      return {
        ...state,
        students_actions_list: []
      }
    case GET_ALL_STUDENTS_LIST_FAIL:
    case STUDENT_ADD_FAIL:
      return {
        state
      }
    default:
      return state
  }
}