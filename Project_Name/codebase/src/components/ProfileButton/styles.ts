import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    paddingBottom: dimensions.spacingInlineXxs12,
    borderBottomColor: colors.light.neutralColor4,
    borderBottomWidth: dimensions.spacingInlineThin2
  }
}) 