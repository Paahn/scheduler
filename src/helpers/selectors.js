function getAppointmentsForDay(state, day) {
  const resultDay = state.days.find((thisDay) => {
    return thisDay.name === day;
  });
  const appointmentIds = resultDay ? resultDay.appointments : [];
  const resultArray = [];
  appointmentIds.forEach((appointmentId) => {
    resultArray.push(state.appointments[appointmentId])
  })
  return resultArray;
}

function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  } else {
    return null;
  }
}

function getInterviewersForDay(state, day) {
  console.log(state.days);
  const availInterviewers = state.days.filter(available => available.name === day).map(available => available.interviewers)[0] ||
    [];
  // const availInterviewers = availableInterviewers.map(el => availInterviewers[el]);
  return availInterviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };