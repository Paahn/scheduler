import React from 'react';
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import { getInterviewersForDay } from "helpers/selectors";

export default function InterviewerList(props) {
  
  const interviewers = getInterviewersForDay(props.state,  props.state.day);
  

  const listOfInterviewers = Object.keys(props.interviewers).map(id => {
    const interviewer = props.interviewers[id]
    return (
      <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={ (event) => props.onChange(interviewer.id)}
      key={interviewer.id}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listOfInterviewers}</ul>
    </section>
  )
}