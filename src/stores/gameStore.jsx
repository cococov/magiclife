import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  createContext
} from 'react';
import { database } from 'firebase';
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
export const GameProvider = ({ children }) => {
  const [game, dispatchGame] = useReducer(gameReducer, gameInitialState);
  const [time, setTime] = useState('00:00:00');

  /* timer logic:
      changes time every second.
  */
  const timer = useCallback(() => {
    timerInterval = setInterval(() => {
      let diff = (new Date()).getTime() - game.initialDate.getTime();
      setTime(getFormatDate(diff));
    }, 1000);
  }, [game.initialDate]);

  /* request and suscribe to isStarted:
      changes start when it changes on backend.
  */
  useEffect(() => {
    let ref = database().ref(`isStarted`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      dispatchGame({ type: 'isStarted', value: result });
    });
  }, []);

  /* request and suscribe to initialDate:
      changes initialDate when it changes on backend (for sync purpuses).
  */
  useEffect(() => {
    let ref = database().ref(`initialDate`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      let date = new Date(result);
      dispatchGame({ type: 'initialDate', value: date });
    });
  }, []);

  /* start timer when start changes to true and
     clear the timer and restart time when start is false.
  */
  useEffect(() => {
    if (game.start) {
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