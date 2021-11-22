import React, { createContext, ReactNode, useContext, useState } from 'react';

interface IModalProps {
  modalState: {
    visible: boolean;
  };
  openModal: () => void;
  closeModal: () => void;
}

// Context
const ModalContext = createContext({} as IModalProps);

// Provider
const ModalProvider: React.FC = ({ children }) => {
  const [modalState, setModalState] = useState({ visible: false });

  const openModal = () => setModalState({ visible: true });

  const closeModal = () => setModalState({ visible: false });

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);

  return context;
};

export { ModalProvider, useModal };
