import {
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAIL,
  SET_SCHEDULE_SUCCESS,
  SET_SCHEDULE_FAIL,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAIL,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAIL,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_FAIL,
  SET_ATTENDANCE_SUCCESS,
  SET_ATTENDANCE_FAIL,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE_FAIL,
} from '../../actions/types'

const initialState = {
  schedule: [],
  attendance: ''
}

const setAttendanceList = () => {

}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: payload,
      }
    case GET_ATTENDANCE_SUCCESS:
    case SET_ATTENDANCE_SUCCESS:
      return {
        ...state,
        attendance: payload,
      }
    case SET_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: [payload, ...state.schedule],
      }
    case UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: state.schedule.map(item => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: state.schedule.filter(item => item.id != payload),
      }
    case UPDATE_ATTENDANCE_SUCCESS:
      return {
        ...state,
        schedule: payload,
        // schedule: state.schedule.map(event => {
        //   if(event.id == payload.schedule){
        //     payload.attendance
        //       ? event.attendance.push(payload.student)
        //       : event.attendance.filter(f => f != payload.student)
        //       return event
        //     } else return event
        // }
        // ),
      }
    case GET_SCHEDULE_FAIL:
    case SET_SCHEDULE_FAIL:
    case UPDATE_SCHEDULE_FAIL:
    case DELETE_SCHEDULE_FAIL:
    case GET_ATTENDANCE_FAIL:
    case SET_ATTENDANCE_FAIL:
      return state
    default:
      return state
  }
}
