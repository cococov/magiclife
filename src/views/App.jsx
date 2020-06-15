import React from 'react';
import { initializeApp } from 'firebase';
import { firebaseConfig } from '../static/config.json';
import {
  Drawer,
  Content,
  EndGameModal,
  DrawerButton,
  UserConfigModal
} from '../component';
import { AppProvider } from '../stores';
import '../static/css/App.css';

initializeApp(firebaseConfig);

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <DrawerButton />
        <UserConfigModal />
        <EndGameModal />
        <Content />
        <Drawer />
      </div >
    </AppProvider>
  );
}

export default App;