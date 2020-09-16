import firebase from '@firebase/app';
import '@firebase/database';

/* Initial State */
const userConfigInitialState = {
  isOpenUserModal: false,
  modalName: '',
  modalColor: '',
  modalPlayer: '',
  modalTextColor: ''
};

/**
 * User Config reducer
 * @param {object} state - local state
 * @param {String} action.type - type of action
 * @param {Object} action.params - params for the action
 */
const userConfigReducer = (state, { type, ...params }) => {
  switch (type) {
    case 'OPEN':
      return handleOpenUserConfigModal(params.player);
    case 'ACCEPT':
      return handleAcceptUserConfigModal(state);
    case 'CLOSE':
      return { ...state, isOpenUserModal: false };
    case 'modalName':
      return { ...state, modalName: params.value };
    case 'modalColor':
      return { ...state, modalColor: params.value };
    case 'modalTextColor':
      return { ...state, modalTextColor: params.value };
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
};

/*
   Methods
 */

/**
 * Load all the selected player config to memory
 * and open the modal.
 * @param {Number} player - selected player
 */
const handleOpenUserConfigModal = player => {
  let temporalState = {};
  temporalState['modalPlayer'] = player;

  // Load selected user's config
  let ref = firebase
    .database()
    .ref(`player${player}`);
  ref.on('value', snapshot => {
    const { name, color, textColor } = snapshot.val();
    temporalState['modalName'] = name;
    temporalState['modalColor'] = color;
    temporalState['modalTextColor'] = textColor;
  });

  // Open Modal
  temporalState['isOpenUserModal'] = true;

  return temporalState;
};

/**
 * Send the new user config to the backend
 * and close modal.
 * @param {Object} state - the state of the reducer
 */
const handleAcceptUserConfigModal = state => {
  // send name
  let name = firebase
    .database()
    .ref(`player${state['modalPlayer']}`)
    .child('name');
  name.set(state['modalName'].toUpperCase());

  // send background color
  let color = firebase
    .database()
    .ref(`player${state['modalPlayer']}`)
    .child('color');
  color.set(state['modalColor']);

  // send text color
  let textColor = firebase
    .database()
    .ref(`player${state['modalPlayer']}`)
    .child('textColor');
  textColor.set(state['modalTextColor']);

  // close modal
  return { ...state, isOpenUserModal: false };
};

export {
  userConfigReducer,
  userConfigInitialState
}