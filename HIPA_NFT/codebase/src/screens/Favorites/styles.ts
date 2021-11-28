import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

const windowHeight = Dimensions.get('window').height;

const isUnder670 = windowHeight < 670 ? true : false;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dimensions.spacingStackXxl16,
    paddingHorizontal: dimensions.spacingStackXxl16,
    backgroundColor: colors.light.neutralColor14,
    marginBottom: Platform.OS === 'android' ? dimensions.spacingStackXxl16 : 0,
  },
  divider: { 
    paddingRight: 8 
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
  flexDirection: AlignTypes.ROW,
  justifyContent: AlignTypes.CENTER,
  alignItems: AlignTypes.CENTER,
  },
  buttons: {
    width: dimensions.width90,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    flexDirection: AlignTypes.ROW,
  },

  title: {
    marginTop: dimensions.spacingStackGiant25,
    paddingHorizontal: dimensions.spacingStackXxl16
  },
  filter: {
    height: dimensions.height60,
  },
  content: {
    flex: 1,
    paddingBottom: isUnder670 ? dimensions.padding27 : dimensions.padding18,
  },
  emptyFavorites: {
    marginTop: dimensions.spacingInlineXxl32,
  },
  emptyFavoritesImage: {
    marginBottom: dimensions.spacingStackXGiant30,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER
  },
  emptyFavoritesText: {
    paddingHorizontal: dimensions.spacingStackGiant25,
    marginBottom: dimensions.spacingStackXBig20,
  },
});
