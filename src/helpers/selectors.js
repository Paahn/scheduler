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
  
  const availInterviewers = state.days.filter(available => available.name === day).map(available => available.interviewers)[0] ||
    [];
  return availInterviewers;
}
function getSpotsForDay(state, day) {
  
  let counter = 5;
  const currentDay = state.days.filter(newDay => newDay.name === day)[0];
  currentDay.appointments.forEach( x => {
    if (state.appointments[x].interview){
      counter-= 1;
    }
  } )
  return counter;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay, getSpotsForDay };