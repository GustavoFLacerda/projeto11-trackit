import { createContext, useState } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState('');

  function updateProgress(progresso, total) {
    if (total === 0) {
      setProgress(0);
    }

    setProgress((progresso / total) * 100);
  }

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}

export default ProgressContext;