import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
const axios = require('axios');


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...state, day }));
  const interviewers = getInterviewersForDay(state, state.day);


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
  

  const schedule = getAppointmentsForDay(state, state.day)
    .map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          {...appointment}
          key={appointment.id}
          interview={interview}
          interviewers={interviewers}
          state={state}
          bookInterview={bookInterview}
        />
      );
    })


  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment 
        key="last" 
        time="5pm" 
        bookInterview={bookInterview}
        />
      </section>
    </main>
  );
};
