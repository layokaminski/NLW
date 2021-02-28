import { createContext, ReactNode, useContext, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {

}

interface CountdownProviderProps {
  children: ReactNode;
}

const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [ time, setTime ] = useState(0.1 * 60);
  const [ isActive, setIsActive ] = useState(false);
  const [ hasFinished, setHasFinisehd ] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <CountdownContext.Provider value={{}}>
      { children }
    </CountdownContext.Provider>
  )
}