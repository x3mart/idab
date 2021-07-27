import {
  ADD_ROW_ID,
  DELETE_ROW_ID,
  ADD_ALL_IDS,
  DELETE_ALL_IDS,
} from '../types'


export const add_id = (id) => {
  return  dispatch => {
    dispatch({
      type: ADD_ROW_ID,
      payload: id
    })
  }
}

export const remove_id = (id) => {
  return dispatch => {
    dispatch({
      type: DELETE_ROW_ID,
      payload: id });
  };
};

export const add_all_ids = (ids) => {
  return  dispatch => {
    dispatch({
      type: ADD_ALL_IDS,
      payload: ids
    })
  }
}

export const remove_all_ids = () => {
  return dispatch => {
    dispatch({
      type: DELETE_ALL_IDS
    });
  };
};


