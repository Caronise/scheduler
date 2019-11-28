export function getAppointmentsForDay(state, day) {

  const filteredAppointments = [];
  
  const selectedDay = state.days.filter(d => d.name === day);

  if (selectedDay[0] === undefined)
    return [];
  
  selectedDay[0].appointments.forEach(appointmentId => {
    if(String(appointmentId) in state.appointments) {
      filteredAppointments.push(state.appointments[appointmentId]);
    };
  });
  return filteredAppointments;
  
};

export function getInterview(state, interview) {
  const interviewer = {};
  
  if (!interview){
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