import React from 'react';
import { Button, Modal, ModalProps, TouchableOpacity, View } from 'react-native';
import Close from '../../../assets/close.svg';

import styles from './styles';

interface IModalProps extends ModalProps {
  children: JSX.Element;
  modalVisible: boolean;
  setModalVisible: (param: boolean) => void;
}

const ModalDefault = ({ modalVisible, setModalVisible, children }: IModalProps) => {
  const closeModal = () => setModalVisible(false);

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => closeModal()}>
              <Close />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalDefault;
