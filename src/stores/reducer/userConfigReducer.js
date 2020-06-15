import { database } from 'firebase';

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
      return handleAceptUserConfigModal(state);
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

  // Load slected user's config
  let ref = database().ref(`player${player}`);
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
const handleAceptUserConfigModal = state => {
  // send name
  let name = database()
    .ref(`player${state['modalPlayer']}`)
    .child('name');
  name.set(state['modalName']);

  // send background color
  let color = database()
    .ref(`player${state['modalPlayer']}`)
    .child('color');
  color.set(state['modalColor']);

  // send text color
  let textColor = database()
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