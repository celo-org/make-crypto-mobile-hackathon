import { StyleSheet } from 'react-native';
import { dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

export const styles = StyleSheet.create({
  container: {
    width: dimensions.spacingStackXBig20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: AlignTypes.CENTER,
  },
  icon: {
    marginRight: dimensions.spacingStackQuarck4
  }
}) 