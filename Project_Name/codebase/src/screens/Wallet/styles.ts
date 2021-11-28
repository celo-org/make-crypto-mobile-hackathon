import { colors, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.neutralColor14,
  },
  header: {
    flexDirection: AlignTypes.ROW,
    paddingTop: Platform.OS === 'android' ? dimensions.width40 : dimensions.spacingStackXxl16,
    paddingHorizontal: dimensions.spacingStackXxl16,
    justifyContent: AlignTypes.SPACE_BETWEEN,
  },
  logo: {
    height: dimensions.height40,
    borderRadius: dimensions.spacingStackXxs7,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: dimensions.width90,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    flexDirection: AlignTypes.ROW,
  },

  title: {
    marginTop: dimensions.spacingStackGiant25,
    paddingHorizontal: dimensions.spacingStackXxl16
  }
})