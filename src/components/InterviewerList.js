import React from 'react';
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import { getInterviewersForDay } from "helpers/selectors";
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  
  const availInterviewers = getInterviewersForDay(props.state,  props.state.day);  

  const listOfInterviewers = Object.values(availInterviewers).map(info => {
    
    return (
      <InterviewerListItem
      id={props.interviewers[info].id}
      name={props.interviewers[info].name}
      avatar={props.interviewers[info].avatar}
      selected={props.interviewers[info].id === props.value}
      setInterviewer={ (event) => props.onChange(props.interviewers[info].id)}
      key={props.interviewers[info].id}
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