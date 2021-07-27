import {
  GET_ABOUT_MANAGEMENT_SUCCESS,
  GET_ABOUT_MANAGEMENT_FAIL,
  GET_ABOUT_TEACHERS_SUCCESS,
  GET_ABOUT_TEACHERS_FAIL,
  GET_ABOUT_LEADER_SUCCESS,
  GET_ABOUT_LEADER_FAIL,
  GET_ABOUT_GALLERY_SUCCESS,
  GET_ABOUT_GALLERY_FAIL,
} from '../actions/types'

const initialState = {
  about_leader: {},
  about_management: [],
  about_teachers: [],
  about_gallery: [],
};

export default function(state= initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case GET_ABOUT_MANAGEMENT_SUCCESS:
      return {
        ...state,
        about_management: payload.about_management
      }
    case GET_ABOUT_MANAGEMENT_FAIL:
      return {
        ...state,
        about_management: []
      }
      case GET_ABOUT_LEADER_SUCCESS:
      return {
        ...state,
        about_leader: payload.about_leader
      }
    case GET_ABOUT_LEADER_FAIL:
      return {
        ...state,
        about_leader: {}
      }
    case GET_ABOUT_TEACHERS_SUCCESS:
      return {
        ...state,
        about_teachers: payload.about_teachers
      }
    case GET_ABOUT_TEACHERS_FAIL:
      return {
        ...state,
        about_teachers: []
      }
      case GET_ABOUT_GALLERY_SUCCESS:
      return {
        ...state,
        about_gallery: payload.about_gallery
      }
    case GET_ABOUT_GALLERY_FAIL:
      return {
        ...state,
        about_gallery: []
      }
    default:
      return state
  }
}