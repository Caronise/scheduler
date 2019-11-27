import React from "react";
import ReactDOM from "react-dom";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment({ interview, time, interviewer, student }) {
  return(
    <article className="appointment">
      <Header time={time} />
        {interview ? <Show interviewer={interview.interviewer} student={interview.student}/> : <Empty />}
    </article>
  );
};