import React, {
  useRef,
  useEffect,
  useReducer,
  useContext,
  createContext
} from 'react';
import { database } from 'firebase';
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
  const previousLife = useRef();

  useEffect(() => {
    let ref = database().ref(`player${player}`);
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

  useEffect(() => {
    let previousValue = previousLife.current;
    let actualValue = playerState.life;

    if (previousValue && game.start) {
      if (previousValue < actualValue)
        addLogLine(`[${game.time}] ${playerState.name} | +1 Life`);
      if (previousValue > actualValue)
        addLogLine(`[${game.time}] ${playerState.name} | -1 Life`);
    }
    previousLife.current = playerState.life;
  }, [playerState.life])

  const plusLife = () => {
    if (game.start)
      dispatchPlayer({ type: 'PLUS_LIFE' });
  };

  const minusLife = () => {
    if (game.start)
      dispatchPlayer({ type: 'MINUS_LIFE' });
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