import { StyleSheet } from 'react-native';
import { colors, dimensions, border, fontsFamily, fontsSize } from '../../styles';
import { AlignTypes } from '../../utils/enum';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: AlignTypes.CENTER,
    justifyContent: AlignTypes.CENTER,
    height: dimensions.height50,
    width: dimensions.widthFull,
    borderRadius: border.radius.xxl26,
  },

  containerTextIcon: {
    flexDirection: 'row',
    alignItems: AlignTypes.CENTER,
    position: 'relative',
  },

  icon: {
    marginRight: dimensions.spacingStackLg10,
  },

  textButtonDescription: {
    color: colors.light.neutralColor11,
    position: 'absolute',
    right: 20,
    fontFamily: fontsFamily.montserrat.medium500,
    fontSize: fontsSize.xs12,
  },
});
