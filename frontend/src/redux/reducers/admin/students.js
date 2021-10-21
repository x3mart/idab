import {
  GET_ALL_STUDENTS_LIST_SUCCESS,
  GET_ALL_STUDENTS_LIST_FAIL,
  GET_ALL_STUDENTS_ID_FAIL,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_FAIL,
  STUDENT_ADD_SUCCESS,
  STUDENT_ADD_FAIL,
  GET_SPECIALITIES_SUCCESS,
  GET_SPECIALITIES_FAIL,
  GET_PROGRAMS_SUCCESS,
  GET_PROGRAMS_FAIL,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  SORT_STUDENTS_SUCCESS,
  SORT_STUDENTS_FAIL,
} from '../../actions/types'

const initialState = {
  students_list: [],
  sorted_list: [],
  sort_value: null,
  specialities: [],
  programs: [],
  groups: [],
  error: '',
  status: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_STUDENTS_LIST_SUCCESS:
      return {
        ...state,
        students_list: payload.students_list,
        sorted_list: payload.students_list,
      }
    case STUDENT_ADD_SUCCESS:
      return {
        ...state,
        students_list: [payload.student, ...state.students_list],
        sorted_list: [payload.student, ...state.sorted_list],
        status: payload.status
      }
    case STUDENT_ADD_FAIL:
      return {
        ...state,
        error: payload,
      }
    case STUDENT_UPDATE_SUCCESS:
      return {
        ...state,
        students_list: state.students_list.map(item => {
          if (item.id == payload.id) {
            return payload
          }
          return item
        }),
        sorted_list: state.sorted_list.map(item => {
          if (item.id == payload.id) {
            return payload
          }
          return item
        }),
      }
    case STUDENT_DELETE_SUCCESS:
      return {
        ...state,
        students_list: state.students_list.filter(item => item.id !== payload),
        sorted_list: state.sorted_list.filter(item => item.id !== payload),
      }
    case SORT_STUDENTS_SUCCESS:
      const getSort = payload => {
        if (state.sort_value == null && !payload) {
          return state.students_list
        } else if (payload && payload == state.sort_value) {
          return state.sorted_list
        } else if (payload && payload != state.sort_value) {
          return state.students_list.filter(item =>
            item.training_group.some(group => group.basic == payload)
          )
        }
      }
      return {
        ...state,
        sort_value: payload,
        sorted_list: getSort(payload),
      }

    //     item.training_group.map(group => {
    //     if(group.length > 0){
    //       if(group.id === payload) {
    //         return item.id
    //       }
    //     }
    //   })),
    // case SORT_STUDENTS_SUCCESS:
    //   return {
    //     ...state,
    //     students_list: payload.student,
    //   }
    case GET_SPECIALITIES_SUCCESS:
      return {
        ...state,
        specialities: payload.specialities,
      }
    case GET_PROGRAMS_SUCCESS:
      return {
        ...state,
        programs: payload.programs,
      }
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: payload.groups,
      }
    case GET_ALL_STUDENTS_LIST_FAIL:
      return {
        state,
      }
    default:
      return state
  }
}
