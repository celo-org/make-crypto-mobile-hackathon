import { StyleSheet, Dimensions, Platform } from 'react-native';
import { border, colors, dimensions, fontsFamily } from '@nft/styles';
import fontSizes from '@nft/styles/fontSizes';
import { AlignTypes } from '@nft/utils/enum';

const windowHeight = Dimensions.get('window').height;

const isUnder670 = windowHeight < 670 ? true : false;

export const styles = StyleSheet.create({
  overlay: {
    paddingBottom: isUnder670 ? dimensions.padding72 : dimensions.padding65,
    backgroundColor: colors.light.neutralColor14,
  },
  container: {
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
    paddingHorizontal: dimensions.spacingInlineSm16,
    paddingTop: Platform.OS === 'ios' ? dimensions.spacingStackXxl16 : 0,
  },
  content: {
    marginBottom: dimensions.spacingStackXBig20,
    backgroundColor: colors.light.neutralColor14,
  },
  logo: {
    height: dimensions.height40,
    borderRadius: dimensions.spacingStackXxs7,
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
  },
  contentView: {
    paddingHorizontal: dimensions.spacingStackXxl16,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    flex: 1,
  },
  buttons: {
    justifyContent: AlignTypes.SPACE_BETWEEN,
    flexDirection: AlignTypes.ROW,
  },
  scrollview: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    flexGrow: 1,
  },
  touchableOpacityContainer: {
    width: dimensions.widthFull,
  },
  profileInfo: {
    marginTop: dimensions.spacingStackXxl16,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
  },
  avatar: {
    height: dimensions.height100,
    width: dimensions.width100,
  },
  images: {
    height: dimensions.height100,
    width: dimensions.width100,
    borderRadius: border.radius.xb50,
  },
  changePhoto: {
    backgroundColor: colors.light.neutralColor14,
    width: 34,
    height: 34,
    borderRadius: 15,
    position: 'absolute',
    right: -14,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
  },
  camera: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    width: dimensions.width26,
    height: dimensions.heigth26,
    borderRadius: border.radius.lg12,
    backgroundColor: '#c6c6c6',
  },
  username: {
    marginTop: dimensions.spacingStackLg10,
    flexDirection: AlignTypes.ROW,
  },
  userNameText: {
    color: colors.light.neutralColor4,
    fontSize: fontSizes.xl20,
    fontFamily: fontsFamily.montserrat.medium500,
  },
  hash: {
    flexDirection: AlignTypes.ROW,
    alignItems: AlignTypes.CENTER,
    justifyContent: AlignTypes.CENTER,
    width: 230,
  },
  hashImage: {
    marginLeft: dimensions.spacingStackSmall5,
  },
  userbio: {
    marginTop: dimensions.spacingStackXxl16,
    marginBottom: dimensions.spacingStackXHuge40,
    flexDirection: AlignTypes.ROW,
    paddingHorizontal: dimensions.spacingInlineSm16,
  },
  bioDescription: {
    color: colors.light.neutralColor7,
    fontSize: fontSizes.xs12,
    fontFamily: fontsFamily.montserrat.medium500,
    textAlign: AlignTypes.CENTER,
  },
  editDescription: {
    marginLeft: dimensions.spacingStackLg10,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
  },
  arts: {
    flexDirection: AlignTypes.ROW,
    width: dimensions.widthFull,
  },
  image: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    paddingHorizontal: dimensions.spacingInlineSm16,
  },
  body: {
    width: dimensions.widthFull,
    marginTop: dimensions.spacingStackXBig20,
  },
  description: {
    marginTop: dimensions.spacingStackXHuge40,
    marginBottom: dimensions.spacingStackXBig20,
  },
  nftsImages: {
    width: dimensions.widthFull,
    flexWrap: 'wrap',
    flexDirection: AlignTypes.ROW,
  },
  title: {
    marginTop: dimensions.spacingStackGiant25,
    marginLeft: dimensions.spacingInlineSm16,
  },
  emptyProfileContainer: {
    marginTop: dimensions.spacingStackXHuge40,
  },
  emptyImage: {
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    marginBottom: dimensions.spacingStackXHuge40,
  },
  emptyProfileText1: {
    marginTop: dimensions.spacingStackXBig20,
  },
  emptyProfileText2: {
    marginVertical: dimensions.spacingInlineXs14,
  },
  emptyProfileLineButton: {
    marginTop: dimensions.spacingInlineLg27,
  },
});
