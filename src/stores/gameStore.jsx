import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  createContext
} from 'react';
import { gameReducer, gameInitialState } from './reducer'

/**
 * Game Context.
 */
const GameContext = createContext();

/**
 * hh:mm:ss
 */
const getFormatDate = difference => {
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let formatDate = `${hours}:${minutes}:${seconds}`
    .replace(/(\d+):(\d+):(\d+)/,
      (str, hh, mm, ss) =>
        `${(hh < 10) ? '0' : ''}${hh}:${(mm < 10) ? '0' : ''}${mm}:${(ss < 10) ? '0' : ''}${ss}`
    );

  return formatDate;
};

/**
 * Game Provider.
 * @param {Object} props
 * @param {Component} props.children
 */
let timerInterval = null;
let initialDate = new Date();
export const GameProvider = ({ children }) => {
  const [game, dispatchGame] = useReducer(gameReducer, gameInitialState);
  const [time, setTime] = useState('00:00:00');

  const timer = useCallback(() => {
    timerInterval = setInterval(() => {
      let diff = (new Date()).getTime() - initialDate.getTime();
      setTime(getFormatDate(diff));
    }, 1000)
  }, []);

  useEffect(() => {
    if (game.start) {
      initialDate = new Date();
      timer();
    } else {
      clearInterval(timerInterval);
      setTime('00:00:00');
    }
  }, [game.start, timer]);

  return (
    <GameContext.Provider
      value={{ time, game, dispatchGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;