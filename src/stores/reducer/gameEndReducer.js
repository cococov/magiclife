import { database } from 'firebase';

/* Initial State */
const gameEndInitialState = {
  isOpenGameModal: false,
  gameModalCup: 0,
  gameModalSnail: 0,
  gameModalCarrot: 0
};

/**
 *  Game end reducer
 * @param {object} state - local state
 * @param {String} action.type - type of action
 * @param {Object} action.params - params for the action
 */
const gameEndReducer = (state, { type, ...params }) => {
  switch (type) {
    case 'OPEN':
      return { ...state, isOpenGameModal: true };
    case 'ACCEPT':
      return handleAceptGameModal(state);
    case 'CLOSE':
      return { ...gameEndInitialState };
    case 'gameModalCup':
      return { ...state, gameModalCup: params.value };
    case 'gameModalSnail':
      return { ...state, gameModalSnail: params.value };
    case 'gameModalCarrot':
      return { ...state, gameModalCarrot: params.value };
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
};

/*
  Methods
*/

/**
 * Send the selected cup, carrot and snail
 * @param {Object} state - state of the modal
 */
const handleAceptGameModal = state => {
  let actualCups = 0;
  let actualCarrots = 0;
  let actualSnails = 0;

  // if winer is selected, send it
  if (state['gameModalCup'] !== 0) {
    let ref1 = database()
      .ref(`player${state['gameModalCup']}`);
    ref1.on('value', snapshot => {
      const result = snapshot.val();
      actualCups = result.cup;
    });
    let cup = database()
      .ref(`player${state['gameModalCup']}`)
      .child('cup');
    cup.set((actualCups + 1));
  };

  // if carrot is selected, send it
  if (state['gameModalCarrot'] !== 0) {
    let ref2 = database()
      .ref(`player${state['gameModalCarrot']}`);
    ref2.on('value', snapshot => {
      const result = snapshot.val();
      actualCarrots = result.carrot;
    });
    let carrot = database()
      .ref(`player${state['gameModalCarrot']}`)
      .child('carrot');
    carrot.set((actualCarrots + 1));
  };

  // if snail is selected, send it
  if (state['gameModalSnail'] !== 0) {
    let ref3 = database()
      .ref(`player${state['gameModalSnail']}`);
    ref3.on('value', snapshot => {
      const result = snapshot.val();
      actualSnails = result.snail;
    });
    let snail = database()
      .ref(`player${state['gameModalSnail']}`)
      .child('snail');
    snail.set((actualSnails + 1));
  };

  // Reset all user's life to 40
  for (let i = 1; i <= 4; i++) {
    let ref = database()
      .ref(`player${i}`)
      .child('life');
    ref.set(40);
  };

  return { ...state, isOpenGameModal: false };
};

export {
  gameEndReducer,
  gameEndInitialState
}