import React from 'react';
import firebase from '@firebase/app';
import '@firebase/database';
import {
  Drawer,
  Content,
  EndGameModal,
  DrawerButton,
  UserConfigModal,
} from '../component';
import { AppProvider, GameProvider } from '../stores';
import { useMediaQuery } from '../hooks/useMediaQuery';
import '../static/css/App.css';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});

const App = () => {
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');

  React.useEffect(() => {
    if (isSmallScreen) {
      window.screen.orientation.lock("landscape");
    }
  }, []);

  return (
    <GameProvider>
      <AppProvider>
        <div className="App">
          {!isSmallScreen && <DrawerButton />}
          <UserConfigModal />
          <EndGameModal />
          <Content />
          <Drawer />
        </div >
      </AppProvider>
    </GameProvider>
  );
}

export default App;