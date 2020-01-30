import { useEffect, useReducer } from 'react';
import { getSpotsForDay } from 'helpers/selectors';
const axios = require('axios');

const UPDATE_DAYS_APPOINTMENTS_INTERVIEWS = 'updateEverything';
const UPDATE_DAY = 'updateDay';
const BOOK_INTERVIEW = 'bookInterview';
const DELETE_INTERVIEW = 'deleteInterview';
const UPDATE_SPOTS = 'updateSpots';


function appStateReducer (state, action) {
  const {type, spots, appointments, appointmentID, days, day, interview, interviewers} = action;
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
      const newState = {...state, appointments: {...state.appointments, [appointmentID]: appointment}};
      return { ...newState, days: newState.days.map( d => {
        return {...d, spots: getSpotsForDay(newState, d.name)};
  
      }) }
    case DELETE_INTERVIEW:
      appointment = {
        ...state.appointments[appointmentID],
        interview: null
      };
      const newerState = {...state, appointments: {...state.appointments, [appointmentID]: appointment}};
      return { ...newerState, days: newerState.days.map( d => {
        return {...d, spots: getSpotsForDay(newerState, d.name)};
  
      }) }
      return {...state, appointments: {...state.appointments, [appointmentID]: appointment}};
    case UPDATE_SPOTS:
      return { ...state, spots};
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
      // dispatch({type: UPDATE_SPOTS, spots: res.spots});
      return Promise.resolve(res);
    });      
  }

  function cancelInterview (id) {

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then( () => {
      console.log();
      dispatch({type: DELETE_INTERVIEW, appointmentID: id});
      // dispatch({type: UPDATE_SPOTS});
    })
  }

  return {state, setDay, bookInterview, cancelInterview};
}