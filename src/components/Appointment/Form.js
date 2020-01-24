import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  console.log(props);

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function save() {
    props.onSave(name, interviewer)
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList 
        interviewers={props.state.interviewers} 
        value={interviewer} 
        onChange={setInterviewer} 
        state={props.state}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}