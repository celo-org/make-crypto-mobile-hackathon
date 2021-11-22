import React from 'react';
import { Modal, ModalProps, TouchableOpacity, View } from 'react-native';
import Close from '../../../assets/close.svg';
import { useModal } from '../../context/modal.context';

import styles from './styles';

interface IModalProps extends ModalProps {
  children: JSX.Element;
}

const ModalDefault = ({ children }: IModalProps) => {
  const { modalState, closeModal } = useModal();

  return (
    <Modal animationType="fade" transparent={true} visible={modalState.visible}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={closeModal}>
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
