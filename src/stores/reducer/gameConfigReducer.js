import firebase from '@firebase/app';
import '@firebase/database';

/* Initial State */
const gameConfigInitialState = {
  isOpen: false,
  hasTimeLimit: false,
  limitTime: 0,
};

/**
 *  Game Config reducer
 * @param {object} state - local state
 * @param {String} action.type - type of action
 * @param {Object} action.params - params for the action
 */
const gameConfigReducer = (state, { type, ...params }) => {
  switch (type) {
    case 'OPEN':
      return { ...state, ...params.payload, isOpen: true };
    case 'ACCEPT':
      return handleAcceptUserConfigModal(state);
    case 'CLOSE':
      return { ...gameConfigInitialState };
    case 'limitTime':
      return { ...state, limitTime: params.value };
    case 'hasTimeLimit':
      return { ...state, hasTimeLimit: params.value };
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
};

/*
  Methods
*/

/**
 * Send the new game config to the backend
 * and close modal.
 * @param {Object} state - the state of the reducer
 */
const handleAcceptUserConfigModal = state => {
  // send hasTimeLimit
  firebase.database()
    .ref('hasTimeLimit')
    .set(state['hasTimeLimit']);

  // send limitTime
  firebase.database()
    .ref('limitTime')
    .set(state['limitTime']);

  // close modal
  return { ...state, isOpen: false };
};


export {
  gameConfigReducer,
  gameConfigInitialState
}