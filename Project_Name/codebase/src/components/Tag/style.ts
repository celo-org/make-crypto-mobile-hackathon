import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

const styles = StyleSheet.create({
  container: {
    borderRadius: border.radius.sm4,
    borderWidth: border.width.hairline,
    height: dimensions.height15,
    justifyContent: AlignTypes.CENTER,
    margin: dimensions.spacingStackQuarck4,
    paddingLeft: dimensions.spacingStackQuarck4,
    paddingRight: dimensions.spacingStackQuarck4,
  },
});

export default styles;
