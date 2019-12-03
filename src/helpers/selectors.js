export function getAppointmentsForDay(state, day) {

  const filteredAppointments = [];

  const selectedDay = state.days.filter(dayObject => dayObject.name === day);

  if (selectedDay.length === 0) {
    return [];
  };

  selectedDay[0].appointments.forEach(appointmentId => {
    if (String(appointmentId) in state.appointments) {
      filteredAppointments.push(state.appointments[appointmentId]);
    };
  });
  return filteredAppointments;

};

export function getInterview(state, interview) {
  const interviewer = {};

  if (!interview) {
    return null;
  }

  // student name and interviewer id are found in
  const studentName = interview.student
  const interviewerId = interview.interviewer

  // interviewer info is found in
  const interviewerInfo = state.interviewers[interviewerId]

  interviewer.student = studentName;
  interviewer.interviewer = interviewerInfo;
  return interviewer;
};

export function getInterviewersForDay(state, day) {
  console.log(state)
  const filteredDays = state.days.filter(obj => obj.name === day)
  if (filteredDays.length === 0) {
    return [];
  };

  const interviewersArr = filteredDays[0].interviewers;
  const interviewersForDay = [];

  for (const interviewer of interviewersArr) {
    if (interviewer in state.interviewers) {
      interviewersForDay.push(state.interviewers[interviewer]);
    }
  }
  return interviewersForDay;

};