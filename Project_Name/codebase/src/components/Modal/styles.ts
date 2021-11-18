import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: dimensions.spacingInlineSm16,
    alignItems: AlignTypes.CENTER,
    justifyContent: AlignTypes.CENTER,
  },
  modalView: {
    backgroundColor: colors.light.neutralColor12,
    borderRadius: border.radius.sm4,
    width: dimensions.widthFull,
    paddingBottom: dimensions.width44,
    paddingTop: dimensions.spacingStackGiant25,
  },
  closeContainer: {
    width: dimensions.widthFull,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: dimensions.spacingInlineXl30,
    paddingBottom: dimensions.spacingStackXBig20,
  },
});

export default styles;
