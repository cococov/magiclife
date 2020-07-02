import React from 'react';
import { initializeApp } from 'firebase';
import { firebaseConfig } from '../static/config.json';
import {
  Drawer,
  Content,
  EndGameModal,
  DrawerButton,
  UserConfigModal,
} from '../component';
import { AppProvider, GameProvider } from '../stores';
import '../static/css/App.css';

initializeApp(firebaseConfig);

const App = () => {
  return (
    <GameProvider>
      <AppProvider>
        <div className="App">
          <DrawerButton />
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