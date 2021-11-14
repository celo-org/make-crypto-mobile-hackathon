import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

const styles = StyleSheet.create({
  container: {
    borderRadius: border.radius.sm4,
    borderWidth: border.width.hairline,
    justifyContent: AlignTypes.CENTER,
    margin: dimensions.spacingStackQuarck4,
    padding: dimensions.spacingStackXxxs6,
  },
});

export default styles;
