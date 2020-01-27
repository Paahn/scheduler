import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const EDIT = "EDIT";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR-SAVE";
  const ERROR_DELETE = "ERROR-DELETE";


  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(props.id, interview)
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW, true))
    .catch((err) => transition(ERROR_SAVE, true));
  }

  function deleteAppointment() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((err) => transition(ERROR_DELETE, true));
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
          id={props.id}
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
        {mode === CONFIRM && (
          <Confirm
            message="Delete this appointment?"
            onConfirm={deleteAppointment}
            onCancel={() => back()}
          />
        )}

        {mode === DELETING && (
          <Status
            message="Deleting"
          />
        )}

        {/* {mode === EDIT && (
          <Form 
            name={props.interview.student}
            interviewer={props.interview.interviewer}
            onCancel={() => back()}
            onSave={save}
          />
        )} */}

        {mode === ERROR_SAVE && (
          <Error 
            message="Something broke while saving, try again"
            onClose={() => back()}
          />
        )}

        {mode === ERROR_DELETE && (
          <Error 
            message="Something broke while deleting, try again"
            onClose={() => back()}
          />
        )}
      
    </article>
  )
}