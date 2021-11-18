import { StyleSheet } from 'react-native';
import { AlignTypes } from '../../utils/enum';

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 35,
    alignItems: AlignTypes.CENTER,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
