import React, { createContext, useState, useCallback } from 'react';
import Firebase from 'firebase';

/**
 * User Context.
 */
const UserContext = createContext();

/**
 * User Provider.
 * @param {Object} props
 * @param {Component} props.children
 * TODO: use useReducer
 */
export const UserProvider = ({ children }) => {
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);

  const handleOpenUserModal = useCallback(() => {
    setIsOpenUserModal(true);
  }, []);

  return (
    <UserContext.Provider
      value={{
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;