import { StyleSheet } from 'react-native';
import { colors, fontsFamily, fontsSize, border, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: AlignTypes.ROW,
  },
  input: {
    borderBottomWidth: border.width.nano,
    borderBottomColor: colors.light.neutralColor7,
    color: colors.light.neutralColor10,
    fontFamily: fontsFamily.montserrat.regular400,
    fontSize: fontsSize.sm14,
    paddingBottom: dimensions.spacingStackXxxs6,
  },
});

export default styles;
