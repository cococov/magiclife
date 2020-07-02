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
      params.callBack(state);
      return { ...gameEndInitialState };
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


export {
  gameEndReducer,
  gameEndInitialState
}