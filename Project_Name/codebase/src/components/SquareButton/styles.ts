import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

export const styles = StyleSheet.create({
  container: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    height: dimensions.height40,
    width: dimensions.width40,
    borderRadius: border.radius.lg10,
    backgroundColor: colors.light.neutralColor12,

    shadowColor: colors.light.neutralColor0,
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
