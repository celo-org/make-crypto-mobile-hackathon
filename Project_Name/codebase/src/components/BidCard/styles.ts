import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    flexDirection: 'row'
  },
  icon: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    borderRadius: border.radius.sm4,
    borderColor: colors.light.neutralColor5,
    borderWidth: border.width.hairline,
    backgroundColor: colors.light.neutralColor12,
    width: 40,
    height: 40
  },
  texts: {
    marginLeft: dimensions.spacingStackXxxs6,
    alignItems: 'baseline'
  }
}) 