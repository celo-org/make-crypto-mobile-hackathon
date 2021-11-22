import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

export const styles = StyleSheet.create({
  container: {
    flexDirection: AlignTypes.ROW,
  },
  icon: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    borderRadius: border.radius.sm4,
    borderColor: colors.light.neutralColor5,
    borderWidth: border.width.hairline,
    backgroundColor: colors.light.neutralColor12,
    width: dimensions.width40,
    height: dimensions.height40,
  },
  texts: {
    marginLeft: dimensions.spacingStackXxxs6,
    alignItems: 'baseline',
  },
});
