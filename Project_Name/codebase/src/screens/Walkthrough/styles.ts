import { colors, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.neutralColor14
  },
  containerItems: { 
    flex: dimensions.spacingStackQuarck4, 
    alignItems: AlignTypes.CENTER, 
    justifyContent: AlignTypes.CENTER }
})