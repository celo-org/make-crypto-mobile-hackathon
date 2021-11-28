import { border, colors, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dimensions.spacingStackXxl16,
    paddingHorizontal: dimensions.spacingStackXxl16,
    backgroundColor: colors.light.neutralColor14,
    marginBottom: Platform.OS === 'android' ? dimensions.spacingStackXxl16 : 0,
  },
  divider: {
    paddingRight: dimensions.spacingStackXs8,
  },
  header: {
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    alignItems: AlignTypes.CENTER,
    paddingTop: Platform.OS === 'ios' ? dimensions.spacingStackXxl16 : 0,
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
    marginBottom: dimensions.spacingStackGiant25,
  },
  uploadFile: {
    marginBottom: dimensions.spacingInlineXs14,
  },
  uploadFileBox: {
    borderWidth: border.width.nano,
    borderColor: colors.light.neutralColor8,
    borderRadius: border.radius.lg10,
    alignItems: AlignTypes.CENTER,
    paddingVertical: dimensions.height45,
    marginTop: dimensions.spacingInlineXs14,
    marginBottom: dimensions.spacingInlineNano7,
    borderStyle: 'dashed',
  },
  uploadFileInput: {
    marginBottom: dimensions.spacingStackGiant25,
  },
  priceOptionsDescription: {
    marginTop: dimensions.spacingStackXs8,
  },
  highlight: {
    marginTop: dimensions.spacingInlineSm16,
  },
  switchContainer: {
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
  },
  switch: {
    marginLeft: dimensions.spacingStackQuarck4,
  },
  highlightHeader: {
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
    justifyContent: AlignTypes.SPACE_BETWEEN,
    marginBottom: dimensions.spacingStackXs8,
  },
  priceContainer: {
    marginTop: dimensions.spacingStackGiant25,
  },
  priceContent: {
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
  },
  percentage: {
    marginLeft: dimensions.spacingStackSmall5,
  },
  priceTitle: {
    marginBottom: dimensions.spacingStackXs8,
  },
  createButton: {
    marginTop: dimensions.spacingStackXHuge40,
    marginBottom: dimensions.height80,
  },
  sellTypeList: {
    marginTop: dimensions.spacingStackXBig20,
    marginRight: 5,
  },
  chooseFile: {
    backgroundColor: colors.light.neutralColor15,
    paddingVertical: dimensions.spacingStackLg10,
    paddingHorizontal: dimensions.spacingStackHuge32,
    borderRadius: border.radius.xxl26,
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
    marginTop: dimensions.spacingInlineXxs12,
  },
  upArrowIcon: {
    marginRight: dimensions.spacingStackXs8,
  },
  imageSelectedContainer: {
    marginBottom: dimensions.spacingInlineXs14,
  },
  imageSelectedText: {
    marginBottom: dimensions.spacingInlineXs14,
  },
  image: {
    height: dimensions.height100,
    width: dimensions.width100,
    borderRadius: border.radius.md6,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  tagContent: {
    flexDirection: AlignTypes.ROW,
  },
  tagTitle: {
    marginBottom: dimensions.spacingStackLg10,
  },
  tagContainer: {
    marginTop: dimensions.spacingInlineSm16,
  },
});

export default styles;
