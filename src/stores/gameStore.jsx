import React, {
  useRef,
  useEffect,
  useReducer,
  useCallback,
  createContext,
  useLayoutEffect
} from 'react';
import firebase from '@firebase/app';
import '@firebase/database';
import { gameReducer, gameInitialState } from './reducer'
import { useState } from 'react';

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
  const [isDownloadChecked, setDownloadChecked] = useState(false);
  const intervalRef = useRef();
  const gameStartRef = useRef(false);

  /*
    request and subscribe to isStarted:
      changes start when it changes on backend.
  */
  useEffect(() => {
    let ref = firebase
      .database()
      .ref(`isStarted`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      dispatchGame({ type: 'isStarted', value: result });
    });
  }, []);

  /*
    request and subscribe to initialDate:
      changes initialDate when it changes on backend (for sync purposes).
  */
  useLayoutEffect(() => {
    let ref = firebase
      .database()
      .ref(`initialDate`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      let date = new Date(result);
      dispatchGame({ type: 'initialDate', value: date });
    });
  }, []);

  /*
    request and subscribe to limitDate:
      changes limitDate when it changes on backend (for sync purposes).
  */
  useLayoutEffect(() => {
    let ref = firebase
      .database()
      .ref(`limitDate`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      let date = new Date(result);
      dispatchGame({ type: 'limitDate', value: date });
    });
  }, []);

  /*
    request and subscribe to limitTime:
      changes limitTime when it changes on backend (for sync purposes).
  */
  useLayoutEffect(() => {
    let ref = firebase
      .database()
      .ref(`limitTime`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      dispatchGame({ type: 'limitTime', value: result });
    });
  }, []);

  /*
    request and subscribe to hasTimeLimit:
      changes hasTimeLimit when it changes on backend (for sync purposes).
  */
  useLayoutEffect(() => {
    let ref = firebase
      .database()
      .ref(`hasTimeLimit`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      dispatchGame({ type: 'hasTimeLimit', value: result });
    });
  }, []);

  /*
  timer logic:
    changes time every second.
*/
  const timer = useCallback(() => {
    clearInterval(intervalRef.current);
    if (game.hasTimeLimit) {
      let timerInterval = setInterval(() => {
        let diff = game.limitDate.getTime() - Date.now();
        dispatchGame({ type: 'time', value: getFormatDate(diff) });
      }, 1000);
      intervalRef.current = timerInterval;
    } else {
      let timerInterval = setInterval(() => {
        let diff = Date.now() - game.initialDate.getTime();
        dispatchGame({ type: 'time', value: getFormatDate(diff) });
      }, 1000);
      intervalRef.current = timerInterval;
    }
  }, [game.initialDate, game.limitDate, game.hasTimeLimit]);

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
    let previousValue = gameStartRef.current;

    if (previousValue !== game.start) {
      if (!game.start) {
        let ref = firebase
          .database()
          .ref(`endGameStats`);
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
          if (isDownloadChecked) dispatchGame({ type: 'DOWNLOAD_LOG' });
        });
      }
    }

    gameStartRef.current = game.start;
  }, [game.start, game.time, isDownloadChecked])

  /*
    Add a new line to teh match log
  */
  const addLogLine = useCallback(logLine => {
    dispatchGame({ type: 'ADD_LOG_LINE', value: logLine });
  }, []);

  /*
    Finish the match
  */
  const finishGame = params => {
    dispatchGame({ type: 'STOP', value: params });
    setDownloadChecked(params.downloadLog);
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