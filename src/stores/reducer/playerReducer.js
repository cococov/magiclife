import { primaryColor } from '../../styles';

/* Initial State */
const playerInitialState = {
  player: 0,
  name: 'NoName',
  cups: 0,
  life: 40,
  snails: 0,
  carrots: 0,
  color: primaryColor.white,
  textColor: primaryColor.black
};

/**
 * Player reducer
 * @param {object} state - local state
 * @param {String} action.type - type of action
 * @param {Object} action.params - params for the action
 */
const playerReducer = (state, { type, ...params }) => {
  switch (type) {
    case 'PLUS_LIFE':
      return { ...state, life: (state.life + 1) };
    case 'MINUS_LIFE':
      return { ...state, life: (state.life - 1) };
    case 'player':
      return { ...state, player: params.value };
    case 'name':
      return { ...state, name: params.value };
    case 'life':
      return { ...state, life: params.value };
    case 'cups':
      return { ...state, cups: params.value };
    case 'carrots':
      return { ...state, carrots: params.value };
    case 'snails':
      return { ...state, snails: params.value };
    case 'color':
      return { ...state, color: params.value };
    case 'textColor':
      return { ...state, textColor: params.value };
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
};

/*
   Methods
 */

export {
  playerReducer,
  playerInitialState
}