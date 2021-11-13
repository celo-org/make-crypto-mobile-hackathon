import { StyleSheet } from 'react-native';
import { colors, fontsSize, fontsFamily, dimensions } from '../../styles';

const styles = StyleSheet.create({
  text: {
    color: colors.light.neutralColor7,
    fontFamily: fontsFamily.montserrat.medium,
    fontSize: fontsSize.xs12,
    lineHeight: dimensions.spacingInlineXs14,
    textAlign: 'center',
  },
});

export default styles;
