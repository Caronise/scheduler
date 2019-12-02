import React from "react";
import "components/Appointment/styles.scss";
import { useVisualMode } from "../../hooks/useVisualMode"

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment({ interview, time, id, interviewers, bookInterview, deleteInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if(interviewer === null)
      transition(ERROR_SAVE, true)

    const interview = {
      student: name,
      interviewer: interviewer || null
    }
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  };

  function destroy(id) {
    transition(CONFIRM);

  };

  // console.log(interview.interviewer.id);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={destroy}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => {
            transition(DELETING, true);
            deleteInterview(id)
              .then(() => {
                transition(EMPTY);
              })
              .catch(() => {
                transition(ERROR_DELETE, true);
              })
          }}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
          name={interview.student}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Ya fucked up the delete"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Ya fucked up the save"
          onClose={() => back()}
        />
      )}
    </article>
  );
};