import { StyleSheet } from 'react-native';
import { dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

export const styles = StyleSheet.create({
  container: {
    width: dimensions.spacingStackXBig20,
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    alignItems: AlignTypes.CENTER,
  },
  icon: {
    marginRight: dimensions.spacingStackQuarck4,
  },
});
