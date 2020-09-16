import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext
} from 'react';
import firebase from '@firebase/app';
import '@firebase/database';
import { playerReducer, playerInitialState } from './reducer';
import { GameContext } from '../stores';

/**
 * Player Context.
 */
const PlayerContext = createContext();

/**
 * Player Provider.
 * @param {Object} props
 * @param {Component} props.children
 */
export const PlayerProvider = ({ children, player }) => {
  const [playerState, dispatchPlayer] = useReducer(playerReducer, playerInitialState);
  const { game, addLogLine } = useContext(GameContext);
  const [counting, setCounting] = useState(-1);
  const countingTimeOutRef = useRef();
  const countingRef = useRef();
  const previousLifeRef = useRef();

  useEffect(() => {
    let ref = firebase
      .database()
      .ref(`player${player}`);
    dispatchPlayer({ type: 'player', value: player });
    ref.on('value', snapshot => {
      const result = snapshot.val();
      dispatchPlayer({ type: 'cups', value: result.cup });
      dispatchPlayer({ type: 'name', value: result.name });
      dispatchPlayer({ type: 'life', value: result.life });
      dispatchPlayer({ type: 'color', value: result.color });
      dispatchPlayer({ type: 'snails', value: result.snail });
      dispatchPlayer({ type: 'carrots', value: result.carrot });
      dispatchPlayer({ type: 'textColor', value: result.textColor });
    });
  }, [player]);

  // TODO: implement this
  useEffect(() => {
    if (counting <= 0) {
      let previousValue = previousLifeRef.current;
      let actualValue = playerState.life;

      if (previousValue && game.start) {
        if (previousValue < actualValue)
          addLogLine(`[${game.time}] | ${playerState.name} | +${(actualValue - previousValue)} Life`);
        if (previousValue > actualValue)
          addLogLine(`[${game.time}] | ${playerState.name} | -${(previousValue - actualValue)} Life`);
      }
      previousLifeRef.current = playerState.life;
    }
  }, [playerState.life, playerState.name, game.start, game.time, counting, addLogLine]);

  useEffect(() => {
    let previousValue = countingRef.current;

    if (previousValue !== counting) {
      if (counting > 0) {
        countingTimeOutRef.current = setTimeout(() => {
          setCounting(0);
        }, 1000);
      } else if (counting === 0) {
        let ref = firebase
          .database()
          .ref(`player${playerState.player}`)
          .child('life');
        ref.set(playerState.life);
      }
    }

    countingRef.current = counting;
  }, [counting, playerState.player, playerState.life]);

  const plusLife = () => {
    if (game.start) {
      clearTimeout(countingTimeOutRef.current);
      dispatchPlayer({ type: 'PLUS_LIFE' });
      setCounting(((counting <= 0) ? 1 : (counting + 1)));
    }
  };

  const minusLife = () => {
    if (game.start) {
      clearTimeout(countingTimeOutRef.current);
      dispatchPlayer({ type: 'MINUS_LIFE' });
      setCounting(((counting <= 0) ? 1 : (counting + 1)));
    }
  };

  return (
    <PlayerContext.Provider
      value={{ playerState, plusLife, minusLife }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;