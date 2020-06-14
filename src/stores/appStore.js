import React, { createContext, useState, useCallback, useEffect } from 'react';
import Firebase from 'firebase';

/**
 * App Context.
 */
const AppContext = createContext();

/**
 * App Provider.
 * @param {Object} props
 * @param {Component} props.children
 * TODO: use useReducer
 * TODO: split appStore on 3 or 4 stores and reduce them in one at the end
 */
export const AppProvider = ({ children }) => {
  /* open/close behavior variables */
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
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
  /* Users */
  const [users, setUsers] = useState(['noName', 'noName', 'noName', 'noName']);

  useEffect(() => {
    let players = [];
    for (let i = 1; i <= 4; i++) {
      let ref = Firebase.database().ref(`player${i}`);
      ref.on('value', snapshot => {
        const result = snapshot.val();
        players.push(result.name);
      });
    };
    setUsers(players);
  }, [isOpenGameModal]);

  /*
   USER CONFIG
 */
  const handleOpenUserConfigModal = useCallback((player) => {
    setModalPlayer(player);
    // Load slected user's config
    let ref = Firebase.database().ref(`player${player}`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      setModalName(result.name);
      setModalColor(result.color);
      setModalTextColor(result.textColor);
    });
    // Open Modal
    setIsOpenUserModal(true);
  }, []);

  const handleAceptUserConfigModal = useCallback(() => {
    // send name
    let name = Firebase.database().ref(`player${modalPlayer}`).child('name');
    name.set(modalName);
    // send background color
    let color = Firebase.database().ref(`player${modalPlayer}`).child('color');
    color.set(modalColor);
    // send text color
    let textColor = Firebase.database().ref(`player${modalPlayer}`).child('textColor');
    textColor.set(modalTextColor);
    // close modal
    setIsOpenUserModal(false);
  }, [modalPlayer, modalName, modalColor, modalTextColor]);

  const handleCloseUserConfigModal = useCallback(() => {
    setIsOpenUserModal(false);
  }, []);

  /*
    GAME MODAL
  */
  const handleOpenGameModal = useCallback(() => {
    setIsOpenGameModal(true);
  }, []);

  const handleCloseGameModal = useCallback(() => {
    // reset game modal items
    setGameModalCup(0);
    setGameModalSnail(0);
    setGameModalCarrot(0);
    // close modal
    setIsOpenGameModal(false);
  }, []);

  const handleAceptGameModal = useCallback(() => {
    let actualCups = 0;
    let actualCarrots = 0;
    let actualSnails = 0;

    // if winer is selected, send it
    if (GameModalCup !== 0) {
      let ref1 = Firebase.database().ref(`player${GameModalCup}`);
      ref1.on('value', snapshot => {
        const result = snapshot.val();
        actualCups = result.cup;
      });
      let cup = Firebase.database().ref(`player${GameModalCup}`).child('cup');
      cup.set((actualCups + 1));
    };

    // if carrot is selected, send it
    if (GameModalCarrot !== 0) {
      let ref2 = Firebase.database().ref(`player${GameModalCarrot}`);
      ref2.on('value', snapshot => {
        const result = snapshot.val();
        actualCarrots = result.carrot;
      });
      let carrot = Firebase.database().ref(`player${GameModalCarrot}`).child('carrot');
      carrot.set((actualCarrots + 1));
    };

    // if snail is selected, send it
    if (GameModalSnail !== 0) {
      let ref3 = Firebase.database().ref(`player${GameModalSnail}`);
      ref3.on('value', snapshot => {
        const result = snapshot.val();
        actualSnails = result.snail;
      });
      let snail = Firebase.database().ref(`player${GameModalSnail}`).child('snail');
      snail.set((actualSnails + 1));
    };

    // Reset all user's life to 40
    for (let i = 1; i <= 4; i++) {
      let ref = Firebase.database().ref(`player${i}`).child('life');
      ref.set(40);
    };

    handleCloseGameModal();
  }, [GameModalCup, GameModalCarrot, GameModalSnail, handleCloseGameModal]);

  /*
    DRAWER
  */
  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        // users
        users,
        // drawer
        isDrawerOpen,
        handleOpenDrawer,
        handleCloseDrawer,
        // game modal
        isOpenGameModal,
        GameModalCup,
        GameModalSnail,
        GameModalCarrot,
        setGameModalCup,
        setGameModalSnail,
        setGameModalCarrot,
        handleOpenGameModal,
        handleAceptGameModal,
        handleCloseGameModal,
        // user config modal
        isOpenUserModal,
        modalName,
        modalColor,
        modalPlayer,
        modalTextColor,
        setModalName,
        setModalColor,
        setModalPlayer,
        setModalTextColor,
        handleOpenUserConfigModal,
        handleAceptUserConfigModal,
        handleCloseUserConfigModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;