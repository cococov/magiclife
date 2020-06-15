/* Initial State */
const drawerInitialState = { isOpenDrawer: false };

/**
 *  Drawer reducer
 * @param {object} state - local state
 * @param {String} action.type - type of action
 */
const drawerReducer = (state, { type }) => {
  switch (type) {
    case 'OPEN':
      return { ...state, isOpenDrawer: true };
    case 'CLOSE':
      return { ...state, isOpenDrawer: false };
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
};


export {
  drawerReducer,
  drawerInitialState
}