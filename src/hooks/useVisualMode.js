import React, { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function useCustomHook() {
    function action() {}

    return { action };
  }

  function transition() { /* ... */ }
  function back() { 
    setHistory((currentHistory) => {
      if (history.length > 1) {
        history.pop();
      }
  
      setMode(prev => history.slice(-1)[0]);
   })
  }

  return { mode, transition, back };
}