import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";



export default function InterviewerList({ interviewers, value, onChange }) {
  
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  const listOfInterviewers = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });
  
  return (

    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer:</h4>
      <ul className="interviewers__list">
        {listOfInterviewers}
      </ul>
    </section>

  );
};