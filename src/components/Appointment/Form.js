import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form({ name, interviewers, interviewer, onSave, onCancel }) {

  const [stateName, setStateName] = useState(name || "");
  const [stateInterviewer, setStateInterviewer] = useState(interviewer || null);

  const reset = function() {
    setStateName("");
    setStateInterviewer(null);
  };

  const cancel = function() {
    reset();
    onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            onChange={(event) => setStateName(event.target.value)}
            className="appointment__create-input text--semi-bold"
            value={stateName}
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList interviewers={interviewers} value={stateInterviewer} onChange={setStateInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => onSave(stateName, stateInterviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};