import { StyleSheet } from 'react-native';
import { border, dimensions } from '../../styles';
import { AlignTypes } from '../../utils/enum';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: dimensions.spacingInlineSm16,
    height: '100%',
  },
  image: {
    height: 333,
    borderRadius: border.radius.xl20,
    marginVertical: dimensions.spacingStackGiant25,
  },
  detailsContainer: {
    marginHorizontal: dimensions.spacingInlineXl30,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: dimensions.spacingStackXBig20,
    marginBottom: dimensions.spacingInlineSm16,
  },
  author: {
    marginBottom: dimensions.spacingInlineSm16,
  },
  detailsFooter: {
    marginBottom: dimensions.spacingStackXHuge40,
    height: dimensions.spacingInlineXl30,
    alignItems: 'flex-start',
  },
  description: {
    marginBottom: dimensions.spacingInlineXl30,
  },
  head: {
    marginVertical: dimensions.spacingInlineSm16,
  },
  buttonContainer: {
    width: '100%',
  },
});

export default styles;
