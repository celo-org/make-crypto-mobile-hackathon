import { StyleSheet } from 'react-native';
import { dimensions, border, colors } from '../../styles';
import { AlignTypes } from '../../utils/enum';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: dimensions.spacingStackXxl16,
    width: dimensions.widthFull,
  },
  heading: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    marginBottom: dimensions.spacingStackGiant25,
  },
  yourBid: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    marginTop: dimensions.height50,
    marginBottom: dimensions.spacingStackGiant25,
  },
  currentBalanceContainer: {
    borderWidth: border.width.nano,
    borderColor: colors.light.neutralColor10,
    borderRadius: border.radius.sm4,
    padding: dimensions.spacingStackXs8,
  },
  currentBid: {
    flexDirection: AlignTypes.ROW,
  },
  currentBidBalance: {
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    width: dimensions.widthFull,
  },
  currentUsdBalance: {
    alignItems: AlignTypes.FLEX_END,
  },
  currentBidValue: {
    marginHorizontal: dimensions.spacingInlineQuarck5,
  },
  secondHeading: {
    paddingBottom: dimensions.spacingStackGiant25,
  },
  submitButton: {
    marginTop: dimensions.width44,
  },
});

export default styles;
