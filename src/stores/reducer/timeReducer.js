import { database } from 'firebase';

/* Initial State */
const gameInitialState = { start: false, initialDate: (new Date()) };

/**
 * Player reducer
 * @param {object} state - local state
 * @param {String} action.type - type of action
 * @param {Object} action.params - params for the action
 */
const gameReducer = (state, { type, ...params }) => {
  switch (type) {
    case 'START':
      let date = new Date();
      sendDate(date);
      sendIsStarted(true);
      return { ...state, start: true, initialDate: date }
    case 'STOP':
      sendIsStarted(false);
      resetGame();
      return { ...state, start: false }
    case 'isStarted':
      return { ...state, start: params.value }
    case 'initialDate':
      return { ...state, initialDate: params.value }
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

const sendDate = async date => {
  let strDate = date.toString();

  let ref = database()
    .ref(`initialDate`)
  ref.set(strDate);
};

const sendIsStarted = async value => {
  let ref = database()
    .ref(`isStarted`)
  ref.set(value);
};


export {
  gameReducer,
  gameInitialState
}