import {
  ADD_ROW_ID,
  DELETE_ROW_ID,
  ADD_ALL_IDS,
  DELETE_ALL_IDS,
} from '../../actions/types'

const initialState = [];

const clearList = (arr) => {
        while (arr.length) {
          arr.pop();
        }
        return arr
      }

const tableReducer = (state = initialState, action) => {
  const {type, payload} = action;
  const id_list = state;

  switch (type) {
    case ADD_ROW_ID:
      if (!state.includes(payload)) {
        return {
          ...id_list,
          payload
        }
      }
      break
    case DELETE_ROW_ID:
      const i = id_list.indexOf(payload)
      if(i > -1) {
        id_list.splice(i,1)
      }
      // return id_list
break
    case DELETE_ALL_IDS:
      return clearList(id_list)
    default:
      return id_list
  }


}


export default tableReducer;