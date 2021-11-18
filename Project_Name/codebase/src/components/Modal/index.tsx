import React from 'react';
import { Button, Modal, ModalProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Close from '../../../assets/close.svg';
import styles from './styles';

interface IModalProps extends ModalProps {
  children: JSX.Element;
  modalVisible: boolean;
  setModalVisible: (param: boolean) => void;
}

const ModalDefault = ({ modalVisible, setModalVisible, children }: IModalProps) => {
  const closeModal = () => setModalVisible(!modalVisible);

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => closeModal()}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDefault;
