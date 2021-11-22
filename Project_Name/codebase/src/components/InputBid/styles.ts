import { StyleSheet } from 'react-native';
import { border, colors, dimensions, fontsFamily, fontsSize } from '../../styles';
import { AlignTypes } from '../../utils/enum';

export const styles = StyleSheet.create({
  container: {
    width: dimensions.widthFull,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
  },
  content: {
    flexDirection: AlignTypes.ROW,
    justifyContent: AlignTypes.CENTER,
    alignItems: AlignTypes.CENTER,
    width: dimensions.widthFull,
  },
  currency: {
    backgroundColor: colors.light.neutralColor12,
    justifyContent: AlignTypes.CENTER,
    borderTopLeftRadius: border.radius.xl20,
    borderBottomLeftRadius: border.radius.xl20,
    borderColor: colors.light.neutralColor5,
    borderWidth: border.width.hairline,
    alignItems: AlignTypes.CENTER,
    height: dimensions.height40,
    width: dimensions.width20
  },
  inputView: {
    height: dimensions.height40,
    width: dimensions.width80,
    backgroundColor: colors.light.neutralColor12,
    borderTopRightRadius: border.radius.xl20,
    borderBottomRightRadius: border.radius.xl20,
    borderColor: colors.light.neutralColor5,
    borderWidth: border.width.hairline,
    justifyContent: AlignTypes.CENTER,
    paddingVertical: dimensions.spacingStackXl13,
    paddingLeft: dimensions.spacingInlineXxs12,
    paddingRight: dimensions.spacingStackSm17
  },
  input: {
    fontFamily: fontsFamily.montserrat.medium500,
    fontSize: fontsSize.xs12,
    color: colors.light.neutralColor3
  },
  currencyFormatted: {
    width: dimensions.widthFull,
    marginTop: dimensions.spacingInlineQuarck5,
    alignItems: AlignTypes.FLEX_END,
    paddingRight: dimensions.spacingInlineXs14,
  }
}) 