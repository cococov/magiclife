import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext
} from 'react';
import firebase from '@firebase/app';
import '@firebase/database';
import { GameContext } from '../stores';
import { drawerReducer, userConfigReducer, gameEndReducer, gameConfigReducer } from './reducer';
import { drawerInitialState, userConfigInitialState, gameEndInitialState, gameConfigInitialState } from './reducer';

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
  const [gameConfigState, dispatchGameConfig] = useReducer(gameConfigReducer, gameConfigInitialState);
  const [drawerState, dispatchDrawer] = useReducer(drawerReducer, drawerInitialState);
  const [users, setUsers] = useState([{ id: 1, name: 'noName', color: '#FFF', textColor: '#000' },
  { id: 2, name: 'noName', color: '#FFF', textColor: '#000' },
  { id: 3, name: 'noName', color: '#FFF', textColor: '#000' },
  { id: 4, name: 'noName', color: '#FFF', textColor: '#000' }]);
  const { finishGame, mutateConfigs } = useContext(GameContext);

  // loads the 4 player names any time that game modal is open
  useEffect(() => {
    let players = [];
    for (let i = 1; i <= 4; i++) {
      let ref = firebase
        .database()
        .ref(`player${i}`);
      ref.on('value', snapshot => {
        const result = snapshot.val();
        players.push({ id: i, name: result.name, color: result.color, textColor: result.textColor });
      });
    };
    setUsers(players);
  }, [gameEndState.isOpenGameModal]);

  // Finish the match
  const onAcceptGameEnd = () => {
    dispatchGameEnd({ type: 'ACCEPT', callBack: finishGame });
  };

  // Modify the game configs
  const onAcceptGameConfig = () => {
    dispatchGameConfig({ type: 'ACCEPT', callBack: mutateConfigs });
  };

  const onOpenGameConfig = async () => {
    let data = {};

    // Load config
    await firebase.database()
      .ref('hasTimeLimit')
      .once('value', snapshot => {
        data['hasTimeLimit'] = snapshot.val();
      });

    // Load config
    await firebase.database()
      .ref('limitTime')
      .once('value', snapshot => {
        data['limitTime'] = snapshot.val();
      });

      dispatchGameConfig({ type: 'OPEN', payload: data });
  };

  return (
    <AppContext.Provider
      value={{
        users,
        drawerState,
        gameEndState,
        gameConfigState,
        userConfigState,
        dispatchDrawer,
        dispatchGameEnd,
        dispatchUserConfig,
        dispatchGameConfig,
        onAcceptGameEnd,
        onOpenGameConfig,
        onAcceptGameConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;