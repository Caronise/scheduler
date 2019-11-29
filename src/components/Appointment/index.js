import React from "react";
import "components/Appointment/styles.scss";
import { useVisualMode } from "../../hooks/useVisualMode"

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

export default function Appointment({ interview, time, id, interviewers, bookInterview }) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW)
      })
  }


  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers = {interviewers}
          onCancel = {() => back()}
          onSave = {save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
};