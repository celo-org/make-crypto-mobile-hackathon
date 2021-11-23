import { StyleSheet } from 'react-native';
import { colors, dimensions, border, fontsFamily, fontsSize } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

export const styles = StyleSheet.create({
  container: {
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
    justifyContent: AlignTypes.CENTER,
    height: dimensions.height50,
    width: dimensions.widthFull,
    borderRadius: border.radius.xxl26,
  },

  containerTextIcon: {
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
    position: 'relative',
  },

  icon: {
    marginRight: dimensions.spacingStackLg10,
  },

  textButtonDescription: {
    color: colors.light.neutralColor11,
    position: 'absolute',
    right: dimensions.spacingStackXBig20,
    fontFamily: fontsFamily.montserrat.medium500,
    fontSize: fontsSize.xs12,
  },
});
