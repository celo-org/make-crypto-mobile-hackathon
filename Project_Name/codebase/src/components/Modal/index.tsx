import React from 'react';
import { Modal, ModalProps, View } from 'react-native';
import styles from './styles';

interface IModalProps extends ModalProps {
  children: JSX.Element;
  modalVisible: boolean;
  setModalVisible: (param: boolean) => void;
}

const ModalDefault = ({ modalVisible, setModalVisible, children }: IModalProps) => {
  return (
    <Modal
      visible={modalVisible}
      style={styles.modalView}
      animationType="fade"
      onRequestClose={() => setModalVisible(!modalVisible)}>
      {children}
    </Modal>
  );
};

export default ModalDefault;
