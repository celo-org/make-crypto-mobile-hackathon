import { StyleSheet } from 'react-native';
import { colors, dimensions } from '@nft/styles';

export const styles = StyleSheet.create({
  container: {
    padding: dimensions.spacingStackLg10,
    borderRadius: dimensions.spacingStackLg10,
    marginRight: dimensions.spacingStackLg10,
    shadowColor: colors.light.neutralColor0,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 2,

    elevation: 4,
    height: dimensions.height40,
  },
});
