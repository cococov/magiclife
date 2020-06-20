import { database } from 'firebase';

/* Initial State */
const gameInitialState = { start: false };

/**
 * Player reducer
 * @param {object} state - local state
 * @param {String} action.type - type of action
 * @param {Object} action.params - params for the action
 */
const gameReducer = (state, { type, ...params }) => {
  switch (type) {
    case 'START':
      return { ...state, start: true }
      case 'STOP':
        resetGame();
      return { ...state, start: false }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
};

/*
   Methods
 */

const resetGame = async () => {
  for (let i = 1; i <= 4; i++) {
    let ref = database()
      .ref(`player${i}`)
      .child('life');
    ref.set(40);
  }
};


export {
  gameReducer,
  gameInitialState
}