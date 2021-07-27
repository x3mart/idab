import axios from "axios";

import {
  SEND_PROGRAM_BID_SUCCESS,
  SEND_PROGRAM_BID_FAIL,
  SEND_PLAN_BID_SUCCESS,
  SEND_PLAN_BID_FAIL,
  SEND_EDUCATION_BID_SUCCESS,
  SEND_EDUCATION_BID_FAIL,
  SEND_EVENT_BID_SUCCESS,
  SEND_EVENT_BID_FAIL,
} from './types'

export const program_bid = (email, name, phone, program_id, company, position, work_experience, education) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, name, phone, program_id, company, position, work_experience, education });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/programbids/`, body, config);
        const data = {
            program: res.status
        }

        dispatch({
            type: SEND_PROGRAM_BID_SUCCESS,
            payload: data
        });
    } catch (err) {
        const data = {
            program: err.response
        }
        dispatch({
            type: SEND_PROGRAM_BID_FAIL,
            payload: data
        })
    }
};


export const plan_bid = (email, name, phone, program_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, name, phone, program_id });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/planbids/`, body, config);
        const data = {
            plan: res.status
        }
        dispatch({
            type: SEND_PLAN_BID_SUCCESS,
            payload: data
        });
    } catch (err) {
        const data = {
            plan: err.response
        }
        dispatch({
            type: SEND_PLAN_BID_FAIL,
            payload: data
        })
    }
};


export const education_bid = (email, name, phone, info) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, name, phone, info});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/educationbids/`, body, config);
        const data = {
            education: res.status
        }

        dispatch({
            type: SEND_EDUCATION_BID_SUCCESS,
            payload: data
        });
    } catch (err) {
        const data = {
            education: err.response
        }
        dispatch({
            type: SEND_EDUCATION_BID_FAIL,
            payload: data
        })
    }
};


export const event_bid = (email, name, phone, event_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, name, phone, event_id});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/eventbids/`, body, config);
        const data = {
            event: res.status
        }

        dispatch({
            type: SEND_EVENT_BID_SUCCESS,
            payload: data
        });
    } catch (err) {
        const data = {
            event: err.response
        }
        dispatch({
            type: SEND_EVENT_BID_FAIL,
            payload: data
        })
    }
};


