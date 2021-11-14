import { StyleSheet } from 'react-native';
import { border, colors, dimensions, fontsFamily, fontsSize } from '../../styles';
import { AlignTypes } from '../../utils/enum';

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: dimensions.widthFull,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
  },
  text: {
    fontFamily: fontsFamily.montserratAlternates.semiBold,
    fontSize: fontsSize.md16,
    color: colors.light.neutralColor11,
    textAlign: AlignTypes.CENTER,
  },
});

export default styles;
