import { colors, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
    height: dimensions.spacingStackXxHuge65,
    paddingHorizontal: dimensions.spacingStackXxl16,
    justifyContent: AlignTypes.SPACE_BETWEEN
  },
  
  containerDots: {
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
    justifyContent: AlignTypes.CENTER
  },

  dot: {
    height: dimensions.spacingStackLg10,
    borderRadius: dimensions.spacingInlineQuarck5,
    backgroundColor: colors.light.neutralColor1,
    marginRight: dimensions.spacingStackLg10,
  },

  
})