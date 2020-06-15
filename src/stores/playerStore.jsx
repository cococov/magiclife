import React, {
  useEffect,
  useReducer,
  createContext
} from 'react';
import { database } from 'firebase';
import { playerReducer, playerInitialState } from './reducer'

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

  return (
    <PlayerContext.Provider
      value={{ playerState, dispatchPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;