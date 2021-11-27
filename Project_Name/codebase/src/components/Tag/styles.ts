import { StyleSheet } from 'react-native';
import { border, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

const styles = StyleSheet.create({
  container: {
    borderRadius: border.radius.sm4,
    borderWidth: border.width.hairline,
    justifyContent: AlignTypes.CENTER,
    marginLeft: dimensions.spacingInlineNano7,
    paddingHorizontal: dimensions.spacingStackQuarck4,
  },
});

export default styles;
