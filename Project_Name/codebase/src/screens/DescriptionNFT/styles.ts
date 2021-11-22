import { Dimensions, StyleSheet } from 'react-native';
import { border, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

const deviceHeight = Dimensions.get('window').height;

const paddingSmallDevice = deviceHeight < 700 ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: dimensions.spacingInlineSm16,
  },
  image: {
    height: dimensions.height400,
    borderRadius: border.radius.xl20,
    marginVertical: dimensions.spacingInlineSm16,
  },
  detailsContainer: {
    marginHorizontal: dimensions.spacingInlineSm16,
  },
  detailsHeader: {
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    paddingRight: dimensions.spacingStackXBig20,
    marginBottom: dimensions.spacingInlineSm16,
  },
  author: {
    marginBottom: dimensions.spacingInlineSm16,
  },
  detailsFooter: {
    marginBottom: dimensions.spacingStackXHuge40,
  },
  description: {
    marginBottom: dimensions.spacingInlineXl30,
  },
  buttonContainer: {
    width: dimensions.widthFull,
    paddingHorizontal: dimensions.spacingInlineSm16,
    paddingBottom: paddingSmallDevice,
  },
  head: {
    paddingTop: dimensions.spacingInlineSm16,
  },
  scrollView: {
    flex: 1,
  },
});

export default styles;
