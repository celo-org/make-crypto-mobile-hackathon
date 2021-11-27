import { StyleSheet } from 'react-native';
import { colors, fontsFamily, fontsSize, border, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
  },
  input: {
    borderBottomWidth: border.width.nano,
    borderBottomColor: colors.light.neutralColor7,
    color: colors.light.neutralColor6,
    fontFamily: fontsFamily.montserrat.regular400,
    fontSize: fontsSize.sm14,
    paddingBottom: dimensions.spacingStackXxxs6,
    marginTop: dimensions.spacingStackXxs7,
    position: 'relative',
  },
  optionalText: {
    marginLeft: dimensions.spacingStackXBig20,
  },
  optionalCurrency: {
    position: 'absolute',
    right: dimensions.spacingInlineXs14,
    bottom: dimensions.spacingStackXxs7,
  },
});

export default styles;
