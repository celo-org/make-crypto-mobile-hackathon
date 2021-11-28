import { dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: AlignTypes.CENTER,
  },

  image: {
    left: dimensions.width6,
    top: dimensions.width15
  },

  containerTitleDescription:{
    marginHorizontal: dimensions.spacingStackXxl16,
    paddingTop: dimensions.width43
  },

  dividerText: {
    padding: dimensions.spacingStackLg10
  }
})