import React, { useState } from 'react';
import Firebase from 'firebase';
import { firebaseConfig } from './static/config.json';
import { Content, UserConfigModal, EndGameModal, Drawer } from './component';
import './static/css/App.css';

Firebase.initializeApp(firebaseConfig);

const App = () => {
  /* open/close behavior variables */
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpenGameModal, setIsOpenGameModal] = useState(false);
  /* User config variables */
  const [modalName, setModalName] = useState(1);
  const [modalColor, setModalColor] = useState(1);
  const [modalPlayer, setModalPlayer] = useState(1);
  const [modalTextColor, setModalTextColor] = useState(1);
  /* Game modal variables */
  const [GameModalCup, setGameModalCup] = useState(0);
  const [GameModalSnail, setGameModalSnail] = useState(0);
  const [GameModalCarrot, setGameModalCarrot] = useState(0);

  /*
    DRAWER
  */
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  /*
    USER CONFIG
  */
  const handleOpenUserConfigModal = (player) => {
    setModalPlayer(player);
    let ref = Firebase.database().ref(`player${player}`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      setModalName(result.name);
      setModalColor(result.color);
      setModalTextColor(result.textColor);
    });
    setIsOpenModal(true);
  };

  const handleCloseUserConfigModal = () => {
    setIsOpenModal(false);
  };

  const handleAceptUserConfigModal = () => {
    let name = Firebase.database().ref(`player${modalPlayer}`).child('name');
    name.set(modalName);
    let color = Firebase.database().ref(`player${modalPlayer}`).child('color');
    color.set(modalColor);
    let textColor = Firebase.database().ref(`player${modalPlayer}`).child('textColor');
    textColor.set(modalTextColor);
    handleCloseUserConfigModal();
  };

  /*
    GAME MODAL
  */
  const handleOpenGameModal = () => {
    setIsOpenGameModal(true);
  };

  const handleCloseGameModal = () => {
    setGameModalCup(0);
    setGameModalSnail(0);
    setGameModalCarrot(0);
    setIsOpenGameModal(false);
  };

  const handleAceptGameModal = () => {
    let actualCups = 0;
    let actualCarrots = 0;
    let actualSnails = 0;
    if (GameModalCup !== 0) {
      let ref1 = Firebase.database().ref(`player${GameModalCup}`);
      ref1.on('value', snapshot => {
        const result = snapshot.val();
        actualCups = result.cup;
      });
      let cup = Firebase.database().ref(`player${GameModalCup}`).child('cup');
      cup.set((actualCups + 1));
    }
    if (GameModalCarrot !== 0) {
      let ref2 = Firebase.database().ref(`player${GameModalCarrot}`);
      ref2.on('value', snapshot => {
        const result = snapshot.val();
        actualCarrots = result.carrot;
      });
      let carrot = Firebase.database().ref(`player${GameModalCarrot}`).child('carrot');
      carrot.set((actualCarrots + 1));
    }
    if (GameModalSnail !== 0) {
      let ref3 = Firebase.database().ref(`player${GameModalSnail}`);
      ref3.on('value', snapshot => {
        const result = snapshot.val();
        actualSnails = result.snail;
      });
      let snail = Firebase.database().ref(`player${GameModalSnail}`).child('snail');
      snail.set((actualSnails + 1));
    }
    resetGame();
    handleCloseGameModal();
  };

  const resetGame = () => {
    for (let i = 1; i <= 4; i++) {
      let ref = Firebase.database().ref(`player${i}`).child('life');
      ref.set(40);
    }
  };

  return (
    <div className="App">
      <UserConfigModal
        isOpenModal={isOpenModal}
        modalName={modalName}
        modalColor={modalColor}
        modalPlayer={modalPlayer}
        modalTextColor={modalTextColor}
        setModalName={setModalName}
        setModalColor={setModalColor}
        setModalTextColor={setModalTextColor}
        handleAceptModal={handleAceptUserConfigModal}
        handleCloseModal={handleCloseUserConfigModal}
      />
      <EndGameModal
        isOpenGameModal={isOpenGameModal}
        GameModalCup={GameModalCup}
        GameModalSnail={GameModalSnail}
        GameModalCarrot={GameModalCarrot}
        setGameModalCup={setGameModalCup}
        setGameModalSnail={setGameModalSnail}
        setGameModalCarrot={setGameModalCarrot}
        handleAceptModal={handleAceptGameModal}
        handleCloseModal={handleCloseGameModal}
      />
      <Content />
      <Drawer
        isDrawerOpen={isDrawerOpen}
        handleOpenDrawer={handleOpenDrawer}
        handleCloseDrawer={handleCloseDrawer}
        handleOpenGameModal={handleOpenGameModal}
        handleOpenUserConfigModal={handleOpenUserConfigModal}
      />
    </div >
  );
}

export default App;