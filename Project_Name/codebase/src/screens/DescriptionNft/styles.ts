import { Dimensions, StyleSheet } from 'react-native';
import { border, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

const deviceHeight = Dimensions.get('window').height;

const paddingSmallDevice = deviceHeight < 700 ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: dimensions.spacingInlineSm16,
  },
  image: {
    height: 400,
    borderRadius: border.radius.xl20,
    marginVertical: dimensions.spacingInlineSm16,
  },
  detailsContainer: {
    marginHorizontal: dimensions.spacingInlineSm16,
  },
  detailsHeader: {
    flexDirection: 'row',
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
    width: '100%',
    paddingHorizontal: dimensions.spacingInlineSm16,
    paddingBottom: paddingSmallDevice,
  },
  head: {
    paddingTop: dimensions.spacingInlineSm16,
  },
});

export default styles;
