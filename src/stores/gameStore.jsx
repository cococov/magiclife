import React, {
  useRef,
  useEffect,
  useReducer,
  useCallback,
  createContext,
  useLayoutEffect
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
export const GameProvider = ({ children }) => {
  const [game, dispatchGame] = useReducer(gameReducer, gameInitialState);
  const intervalRef = useRef();

  /*
    timer logic:
      changes time every second.
  */
  const timer = useCallback(() => {
    let timerInterval = setInterval(() => {
      let diff = (new Date()).getTime() - game.initialDate.getTime();
      dispatchGame({ type: 'time', value: getFormatDate(diff) });
    }, 1000);
    intervalRef.current = timerInterval;
  }, [game.initialDate]);

  /*
    request and suscribe to isStarted:
      changes start when it changes on backend.
  */
  useEffect(() => {
    let ref = database().ref(`isStarted`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      dispatchGame({ type: 'isStarted', value: result });
    });
  }, []);

  /*
    request and suscribe to initialDate:
      changes initialDate when it changes on backend (for sync purpuses).
  */
  useLayoutEffect(() => {
    let ref = database().ref(`initialDate`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      let date = new Date(result);
      dispatchGame({ type: 'initialDate', value: date });
    });
  }, []);

  /*
    start timer when start changes to true and
     clear the timer and restart time when start is false.
  */
  useEffect(() => {
    clearInterval(intervalRef.current);
    if (game.start) {
      timer();
    } else {
      dispatchGame({ type: 'RESET_TIME' });
    }
  }, [game.start, timer]);

  useEffect(() => {
    if (!game.start) {
      let ref = database().ref(`endGameStats`);
      ref.once('value', snapshot => {
        const result = snapshot.val();
        dispatchGame({ type: 'ADD_LOG_LINE', value: `[${game.time}] GAME STOPPED` });
        let winnerLog = result.cup !== '' ? `Winner: ${result.cup}` : '';
        let carrotLog = result.carrot !== '' ? `Had a bad day: ${result.carrot}` : '';
        let snailLog = result.snail !== '' ? `Slow as fuck: ${result.snail}` : '';
        (winnerLog !== '') && dispatchGame({ type: 'ADD_LOG_LINE', value: winnerLog });
        (carrotLog !== '') && dispatchGame({ type: 'ADD_LOG_LINE', value: carrotLog });
        (snailLog !== '') && dispatchGame({ type: 'ADD_LOG_LINE', value: snailLog });
        dispatchGame({ type: 'CLEAN_GAME_END_STATS' });
      });
    }
  }, [game.start])

  /*
    Add a new line to teh match log
  */
  const addLogLine = logLine => {
    dispatchGame({ type: 'ADD_LOG_LINE', value: logLine });
  };

  /*
    Finish the match
  */
  const finishGame = params => {
    dispatchGame({ type: 'STOP', value: params });
  };

  /*
    Start the match
  */
  const startGame = () => {
    dispatchGame({ type: 'START' });
  };

  return (
    <GameContext.Provider
      value={{ game, addLogLine, startGame, finishGame, dispatchGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;