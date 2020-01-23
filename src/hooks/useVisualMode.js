import React, { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }

    setMode(newMode);
    setHistory([...history, newMode])
  }
  function back() { 
    setHistory((history) => {
      if (history.length > 1) {
        history.pop();
      }
  
      setMode(prev => history.slice(-1)[0]);
   })
  }

  return { mode, transition, back };
}