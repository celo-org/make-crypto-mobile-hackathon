import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.light.neutralColor8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: 6.0,
    elevation: 24,
    backgroundColor: colors.light.neutralColor12,
    borderRadius: border.radius.lg10,
    width: dimensions.widthFull,
  },
  NftImage: {
    borderTopLeftRadius: border.radius.lg10,
    borderTopRightRadius: border.radius.lg10,
    width: dimensions.widthFull,
    height: 260,
    overflow: 'hidden',
  },
  cardHeader: {
    alignItems: AlignTypes.CENTER,
    flexDirection: AlignTypes.ROW,
    marginBottom: dimensions.spacingInlineQuarck5,
    justifyContent: AlignTypes.SPACE_BETWEEN,
  },
  cardContent: {
    paddingVertical: dimensions.spacingStackXs8,
    paddingHorizontal: dimensions.spacingStackLg10,
    height: dimensions.height90,
  },
  cardFooter: {
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.SPACE_BETWEEN,
  },
  cardDetails: {
    flexDirection: AlignTypes.ROW,
    marginRight: dimensions.spacingStackXBig20,
  },
  tagContainer: {
    marginRight: dimensions.spacingInlineQuarck5,
    flexDirection: AlignTypes.ROW,
  },
});

export default styles;
