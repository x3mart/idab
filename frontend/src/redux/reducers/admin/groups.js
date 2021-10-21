import {
  GET_BASIC_GROUPS_SUCCESS,
  GET_BASIC_GROUPS_FAIL,
  SET_BASIC_GROUP_SUCCESS,
  SET_BASIC_GROUP_FAIL,
  UPDATE_BASIC_GROUP_SUCCESS,
  UPDATE_BASIC_GROUP_FAIL,
  DELETE_BASIC_GROUP_SUCCESS,
  DELETE_BASIC_GROUP_FAIL,
  GET_LK_GROUPS_SUCCESS,
  GET_LK_GROUPS_FAIL,
  SET_GROUP_SUCCESS,
  SET_GROUP_FAIL,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL,
} from '../../actions/types'

const initialState = {
  basic_groups: [],
  groups: [],
}

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_BASIC_GROUPS_SUCCESS:
      return {
        ...state,
        basic_groups: payload,
      }
    case SET_BASIC_GROUP_SUCCESS:
      return {
        ...state,
        basic_groups: [payload, ...state.basic_groups],
      }
    case UPDATE_BASIC_GROUP_SUCCESS:
      return {
        ...state,
        basic_groups: state.basic_groups.map(item => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_BASIC_GROUP_SUCCESS:
      return {
        ...state,
        basic_groups: state.basic_groups.filter(item => item.id != payload),
      }
    case GET_LK_GROUPS_SUCCESS:
      return {
        ...state,
        groups: payload,
      }
    case SET_GROUP_SUCCESS:
      return {
        ...state,
        groups: [payload, ...state.groups],
      }
    case UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        groups: state.groups.map(item => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groups: state.groups.filter(item => item.id !== payload),
      }
    case GET_BASIC_GROUPS_FAIL:
    case SET_BASIC_GROUP_FAIL:
    case UPDATE_BASIC_GROUP_FAIL:
    case DELETE_BASIC_GROUP_FAIL:
    case GET_LK_GROUPS_FAIL:
    case SET_GROUP_FAIL:
    case UPDATE_GROUP_FAIL:
    case DELETE_GROUP_FAIL:
      return state
    default:
      return state
  }
}