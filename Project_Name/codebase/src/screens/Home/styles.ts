import { StyleSheet, Dimensions } from 'react-native';
import { colors, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

const windowHeight = Dimensions.get('window').height;

const isUnder670 = windowHeight < 670 ? true : false

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dimensions.spacingStackXxl16,
    paddingHorizontal: dimensions.spacingStackXxl16,
    backgroundColor: colors.light.neutralColor14,
  },
  header: {
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.SPACE_BETWEEN,
  },
  logo: {
    width: dimensions.height80,
    height: dimensions.height40,
    borderRadius: dimensions.spacingStackXxs7,
    backgroundColor: colors.light.neutralColor12,

    shadowColor: colors.light.neutralColor0,
    shadowOffset: {
      width: dimensions.spacingStackXxxs6,
      height: dimensions.spacingStackQuarck4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: dimensions.spacingInlineXxxs9,
  },
  buttons: {
    width: dimensions.width90,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    flexDirection: AlignTypes.ROW,
  },
  title: {
    marginVertical: dimensions.spacingStackXBig20,
  },
  filter: {
    height: dimensions.height60,
  },
  content: {
    flex: 1,
    paddingBottom: isUnder670 ? dimensions.padding27 : dimensions.padding18,
  },
});
