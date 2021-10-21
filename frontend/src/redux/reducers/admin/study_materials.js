import {
  GET_STUDY_MATERIALS_SUCCESS,
  GET_STUDY_MATERIALS_FAIL,
  SET_STUDY_MATERIAL_SUCCESS,
  SET_STUDY_MATERIAL_FAIL,
  UPDATE_STUDY_MATERIAL_SUCCESS,
  UPDATE_STUDY_MATERIAL_FAIL,
  DELETE_STUDY_MATERIAL_SUCCESS,
  DELETE_STUDY_MATERIAL_FAIL,
} from '../../actions/types'

const initialState = {
  study_materials: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case   GET_STUDY_MATERIALS_SUCCESS:
      return {
        ...state,
        study_materials: payload,
      }
    case SET_STUDY_MATERIAL_SUCCESS:
      return {
        ...state,
        study_materials: [payload, ...state.study_materials],
      }
    case UPDATE_STUDY_MATERIAL_SUCCESS:
      return {
        ...state,
        study_materials: state.study_materials.map(item => {
          if (item.id == payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_STUDY_MATERIAL_SUCCESS:
      return {
        ...state,
        study_materials: state.study_materials.filter(item => item.id !== payload),
      }

    case GET_STUDY_MATERIALS_FAIL:
    case SET_STUDY_MATERIAL_FAIL:
    case UPDATE_STUDY_MATERIAL_FAIL:
    case DELETE_STUDY_MATERIAL_FAIL:
      return {
        state,
      }
    default:
      return state
  }
}