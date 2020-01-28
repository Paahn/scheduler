import { useState, useEffect } from 'react';
const axios = require('axios');

export default function useApplicationData() {

  const [state, setState] = useState({
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
        setState(prev => ({...prev, days, appointments, interviewers }));
      })
  }, []);

  const setDay = day => setState(prev => ({ ...state, day }));

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };     
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(res => {
      setState({...state, appointments});
      return Promise.resolve(res);
    });      
  }

  function cancelInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then( () => {
      setState({ ...state, appointments})
    })
  }

  return {state, setDay, bookInterview, cancelInterview};
}