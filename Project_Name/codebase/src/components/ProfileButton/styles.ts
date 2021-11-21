import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: dimensions.spacingInlineXxs12,
    borderBottomColor: colors.light.neutralColor4,
    borderBottomWidth: dimensions.spacingInlineThin2
  }
}) 