import { StyleSheet } from 'react-native';
import { border, colors, dimensions, fontsFamily, fontsSize } from '../../styles';
import { AlignTypes } from '../../utils/enum';

const styles = StyleSheet.create({
  container: {
    height: dimensions.height50,
    backgroundColor: colors.light.neutralColor4,
    borderRadius: border.radius.md6,
    width: dimensions.widthFull,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    flexDirection: AlignTypes.ROW
  },
  icon: {
    marginRight: dimensions.spacingInlineXxs12
  }
});

export default styles;
