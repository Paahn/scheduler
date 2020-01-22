import React, { useState } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import InterviewerList from "./InterviewerList";
import Header from "../components/Appointment/Header";
import Appointment from "components/Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "5pm",
    interview: {
      student: "Arthur Negus",
      interviewer: { 
        id: 4,
         name: "Cohana Roy", 
         avatar: "https://i.imgur.com/FK8V841.jpg" 
      }
    }
  },
  {
    id: 4,
    time: "9am",
    interview: {
      student: "Chuck Schuldiner",
      interviewer: { 
        id: 2,
        name: "Tori Malcolm", 
        avatar: "https://i.imgur.com/Nmx0Qxo.png" 
      }
    }
  },
  {
    id: 5,
    time: "10am"
  }
];


export default function Application(props) {
  const [day, setDay] = useState("Monday");

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {/* <Header />
        <InterviewerList 
          interviewers={interviewers}/> */}
      </section>
    </main>
  );
}
