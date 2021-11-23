import { StyleSheet } from 'react-native';
import { colors, dimensions } from '@nft/styles';

export const styles = StyleSheet.create({
  container: {
    padding: dimensions.spacingStackLg10,
    borderRadius: dimensions.spacingStackLg10,
    marginRight: dimensions.spacingStackLg10,
    shadowColor: colors.light.neutralColor0,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    height: dimensions.height40,
  },
});
