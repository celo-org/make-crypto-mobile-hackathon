import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

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
    width: '100%',
  },
  NftImage: {
    borderTopLeftRadius: border.radius.lg10,
    borderTopRightRadius: border.radius.lg10,
    width: '100%',
    height: 260,
    overflow: 'hidden',
  },
  cardHeader: {
    alignItems: AlignTypes.CENTER,
    flexDirection: 'row',
    marginBottom: dimensions.spacingInlineQuarck5,
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: dimensions.spacingStackXs8,
    paddingHorizontal: dimensions.spacingStackLg10,
    height: 90,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetails: {
    flexDirection: 'row',
    marginRight: 20,
  },
  tagContainer: {
    marginRight: dimensions.spacingInlineQuarck5,
  },
});

export default styles;
