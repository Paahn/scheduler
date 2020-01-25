import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const EDIT = "EDIT";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";


  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(props.id, interview)
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW, true);
    })
    // .catch(() => oshit())

  }
  

  return (
    <article className="appointment">
      <Header time={props.time} />
      
        {mode === EMPTY &&
        <Empty 
          onAdd={() => transition(CREATE)}
        />}

        {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
        }

        {mode === CREATE && 
        <Form 
          onCancel={back} onSave={save} state={props.state}
        />}

        {mode === SAVING && (
          <Status
            message="Saving..."
          />
        )}
      
    </article>
  )
}