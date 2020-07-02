import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext
} from 'react';
import { database } from 'firebase';
import { GameContext } from '../stores';
import { drawerReducer, userConfigReducer, gameEndReducer } from './reducer'
import { drawerInitialState, userConfigInitialState, gameEndInitialState } from './reducer'

/**
 * App Context.
 */
const AppContext = createContext();

/**
 * App Provider.
 * @param {Object} props
 * @param {Component} props.children
 */
export const AppProvider = ({ children }) => {
  const [userConfigState, dispatchUserConfig] = useReducer(userConfigReducer, userConfigInitialState);
  const [gameEndState, dispatchGameEnd] = useReducer(gameEndReducer, gameEndInitialState);
  const [drawerState, dispatchDrawer] = useReducer(drawerReducer, drawerInitialState);
  const [users, setUsers] = useState(['noName', 'noName', 'noName', 'noName']);
  const { finishGame } = useContext(GameContext);

  // loads the 4 player names any time that game modal is open
  useEffect(() => {
    let players = [];
    for (let i = 1; i <= 4; i++) {
      let ref = database().ref(`player${i}`);
      ref.on('value', snapshot => {
        const result = snapshot.val();
        players.push(result.name);
      });
    };
    setUsers(players);
  }, [gameEndState.isOpenGameModal]);

  // Finish the match
  const onAcceptGameEnd = () => {
    dispatchGameEnd({ type: 'ACCEPT', callBack: finishGame });
  };

  return (
    <AppContext.Provider
      value={{
        users,
        drawerState,
        dispatchDrawer,
        gameEndState,
        onAcceptGameEnd,
        dispatchGameEnd,
        userConfigState,
        dispatchUserConfig
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;