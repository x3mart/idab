import {
  GET_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  SET_TASK_SUCCESS,
  SET_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  GET_SOLUTIONS_SUCCESS,
  GET_SOLUTIONS_FAIL,
  SET_SOLUTION_SUCCESS,
  SET_SOLUTION_FAIL,
  UPDATE_SOLUTION_SUCCESS,
  UPDATE_SOLUTION_FAIL,
  DELETE_SOLUTION_SUCCESS,
  DELETE_SOLUTION_FAIL,
  ADD_SOLUTION_SUCCESS,
  ADD_SOLUTION_FAIL,
  ADD_MARK_SUCCESS,
  ADD_MARK_FAIL,
} from '../../actions/types'

const initialState = {
  tasks: [],
  solutions: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload,
      }
    case SET_TASK_SUCCESS:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
      }
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(item => {
          if (item.id == payload.id) {
            return payload
          }
          return item
        }),
      }
    case ADD_SOLUTION_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(item => {
          if (item.id == payload.id) {
            return payload
          }
          return item
        }),
      }
    case ADD_MARK_SUCCESS:

      const addMark = (tasks, data) => {
        let arr = tasks.map(task => {
          if(task.id === data.task_id) {
            task.students.map(student => {
              if(student.id === data.student_id) {
                if(student.solution && student.solution.id === data.solution_id) {
                  return {
                    ...student,
                    solution: {
                      ...student.solution,
                      mark: data.mark,
                    }
                  }
                }

              } else {
                return student
              }
            })
          } else {
            return task
          }
        })
        return arr
      }

      return {
        ...state,
        tasks: addMark(state.tasks, payload),
      }
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(
          item => item.id !== payload
        ),
      }
    case GET_SOLUTIONS_SUCCESS:
      return {
        ...state,
        solutions: payload,
      }
    case SET_SOLUTION_SUCCESS:
      return {
        ...state,
        solutions: [payload, ...state.solutions],
      }
    case UPDATE_SOLUTION_SUCCESS:
      return {
        ...state,
        solutions: state.solutions.map(item => {
          if (item.id == payload.id) {
            return payload
          }
          return item
        }),
      }
    case DELETE_SOLUTION_SUCCESS:
      return {
        ...state,
        solutions: state.solutions.filter(
          item => item.id !== payload
        ),
      }

    case GET_TASKS_FAIL:
    case SET_TASK_FAIL:
    case UPDATE_TASK_FAIL:
    case DELETE_TASK_FAIL:
    case GET_SOLUTIONS_FAIL:
    case SET_SOLUTION_FAIL:
    case UPDATE_SOLUTION_FAIL:
    case DELETE_SOLUTION_FAIL:
      return {
        state,
      }
    default:
      return state
  }
}