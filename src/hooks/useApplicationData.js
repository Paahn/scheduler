import { useEffect, useReducer } from 'react';
const axios = require('axios');

const UPDATE_DAYS_APPOINTMENTS_INTERVIEWS = 'updateEverything';
const UPDATE_DAY = 'updateDay';
const BOOK_INTERVIEW = 'bookInterview';
const DELETE_INTERVIEW = 'deleteInterview';


function appStateReducer (state, action) {
  const {type, appointments, appointmentID, days, day, interview, interviewers} = action;
  let appointment;
  switch (type) {
    case UPDATE_DAYS_APPOINTMENTS_INTERVIEWS:
      return {...state, appointments, days, interviewers};
    case UPDATE_DAY:
      return {...state, day};
    case BOOK_INTERVIEW:
      appointment = {
        ...state.appointments[appointmentID],
        interview
      };
      return {...state, appointments: {...state.appointments, [appointmentID]: appointment}};
    case DELETE_INTERVIEW:
      appointment = {
        ...state.appointments[appointmentID],
        interview: null
      };
      return {...state, appointments: {...state.appointments, [appointmentID]: appointment}};
    default:
      throw Error(`Invalid action: ${type}`);
  }
}

export default function useApplicationData() { 

  const [state, dispatch] = useReducer(appStateReducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => all.map(x => x.data))
      .then(([days, appointments, interviewers]) => {
        dispatch({type: UPDATE_DAYS_APPOINTMENTS_INTERVIEWS, days, appointments, interviewers});
      })
  }, []);

  const setDay = day => dispatch({type: UPDATE_DAY, day });

  function bookInterview(id, interview) {
        
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(res => {
      dispatch({type: BOOK_INTERVIEW, appointmentID: id, interview});
      return Promise.resolve(res);
    });      
  }

  function cancelInterview (id) {

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then( () => {
      dispatch({type: DELETE_INTERVIEW, appointmentID: id});
    })
  }

  return {state, setDay, bookInterview, cancelInterview};
}