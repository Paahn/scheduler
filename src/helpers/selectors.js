function getAppointmentsForDay(state, day) {
  const resultDay = state.days.find((thisDay) => {
    return thisDay.name === day;
  });
  const appointmentsId = resultDay ? resultDay.appointments : [];
  const resultArray = [];
  appointmentsId.forEach((appointmentId) => {
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

export { getAppointmentsForDay, getInterview };