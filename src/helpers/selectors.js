export function getAppointmentsForDay(state, day) {

  let filteredAppointments = [];

  const selectedDay = state.days.filter(dayObject => dayObject.name === day);

  if (selectedDay.length === 0) {
    return [];
  };

  filteredAppointments = selectedDay[0].appointments.map(app => state.appointments[app])
  
  return filteredAppointments;
};

export function getInterview(state, interview) {
  const interviewer = {};

  if (!interview) {
    return null;
  }

  const studentName = interview.student
  const interviewerId = interview.interviewer

  const interviewerInfo = state.interviewers[interviewerId]

  interviewer.student = studentName;
  interviewer.interviewer = interviewerInfo;
  return interviewer;
};

export function getInterviewersForDay(state, day) {
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