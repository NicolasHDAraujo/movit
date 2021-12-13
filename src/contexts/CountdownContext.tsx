import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number,
  seconds: number,
  isActive: boolean,
  hasFinished: boolean,
  startCountdown: () => void,
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode; //quando o componente recebe um filho componente React, tipa como qualquer ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children } : CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  let countdownTimeOut: NodeJS.Timeout; //cancelando a execução do timeOut para não execultar o segundo a mais

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut);
    setIsActive(false);
    setTime(25 * 60);
    setHasFinished(false);
  }
  //se ativo e tempo maior que 0 subtrai 1 do tempo a cada segundo
  useEffect(() => {
    if (isActive && time > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);


  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      isActive,
      hasFinished,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}
