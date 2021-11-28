import { Platform, StyleSheet } from 'react-native';
import { border, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

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
    marginHorizontal: dimensions.spacingStackLg10,
  },
  detailsHeader: {
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    paddingRight: dimensions.spacingStackXBig20,
    marginBottom: dimensions.spacingInlineSm16,
  },
  containerTagsLike: {
    flexDirection: AlignTypes.ROW,
  },
  likes: {
    justifyContent: AlignTypes.CENTER,
    marginLeft: dimensions.spacingInlineNano7
  },
  author: {
    marginBottom: dimensions.spacingInlineSm16,
  },
  detailsFooter: {
    marginBottom: dimensions.spacingStackGiant25,
  },
  description: {
    marginBottom: dimensions.spacingInlineSm16,
  },
  buttonContainer: {
    width: dimensions.widthFull,
    paddingHorizontal: dimensions.spacingStackLg10,
    marginBottom: Platform.OS === 'android' ? dimensions.height30 : dimensions.spacingStackLg10
  },
  head: {
    paddingTop: Platform.OS === 'android' ? dimensions.spacingStackXHuge40 : dimensions.spacingInlineSm16,
  },
  scrollView: {
    flex: 1,
    marginBottom: dimensions.height60
  },
});

export default styles;
