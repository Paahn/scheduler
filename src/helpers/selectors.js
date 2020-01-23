export function getAppointmentsForDay(state, day) {
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

