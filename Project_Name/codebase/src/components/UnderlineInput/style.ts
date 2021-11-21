import { StyleSheet } from 'react-native';
import { colors, fontsFamily, fontsSize, border, dimensions } from '../../styles';

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light.neutralColor7,
    color: colors.light.neutralColor10,
    fontFamily: fontsFamily.montserrat.regular400,
    fontSize: fontsSize.sm14,
    paddingBottom: dimensions.spacingStackXxxs6,
  },
});

export default styles;
