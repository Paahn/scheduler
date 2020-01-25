import { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    console.log(history)
    if (replace) {
      history.pop();
    }

    setMode(newMode);
    setHistory([...history, newMode])
  }

  function back() { 
    setHistory((history) => {
      let newHistory = [...history];
      if (newHistory.length > 1) {
        newHistory.pop();
      }
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
   })
  }


  return { mode, transition, back };
}