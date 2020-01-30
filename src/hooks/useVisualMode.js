import { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {

    if (replace) {
      setHistory(recentHistory => [...recentHistory.slice(0, recentHistory.length - 1), newMode]);
    } else {
      setHistory(recentHistory=> [...recentHistory, newMode]);
    }

    setMode(newMode);
  }

  function back() { 
      if (history.length > 1) {
        const ancientHistory = history.slice(0, history.length - 1);
        setMode(ancientHistory[ancientHistory.length - 1]);
        setHistory(recentHistory => recentHistory.slice(0, history.length - 1));
      }
   
  }
 return { mode, transition, back };
}