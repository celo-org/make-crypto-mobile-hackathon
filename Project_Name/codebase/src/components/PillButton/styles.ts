
import { StyleSheet } from 'react-native';
import { colors, dimensions, border } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.neutralColor4,
    height: dimensions.height50,
    width: dimensions.widthFull,
    borderRadius: border.radius.xxl26,
  },
  
  icon: {
    marginRight: dimensions.spacingStackLg10
  },
})