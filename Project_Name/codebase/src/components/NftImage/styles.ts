import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    marginLeft: dimensions.spacingInlineSm16,
    backgroundColor: colors.light.neutralColor12,
    width: '43%',
    height: 160,
    borderRadius: dimensions.spacingStackXs8,
    marginTop: dimensions.spacingInlineSm16,
    padding: dimensions.spacingStackXs8,
  },
}) 