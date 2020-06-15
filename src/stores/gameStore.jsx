import React, { createContext, useState, useCallback } from 'react';
import { database } from 'firebase';

/**
 * Game Context.
 */
const GameContext = createContext();

/**
 * Game Provider.
 * @param {Object} props
 * @param {Component} props.children
 * TODO: use useReducer
 */
export const GameProvider = ({ children }) => {
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);

  const resetGame = useCallback(() => {
    for (let i = 1; i <= 4; i++) {
      let ref = database()
        .ref(`player${i}`)
        .child('life');
      ref.set(40);
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;