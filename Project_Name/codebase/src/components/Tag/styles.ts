import { StyleSheet } from 'react-native';
import { border, dimensions } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

const styles = StyleSheet.create({
  container: {
    borderRadius: border.radius.sm4,
    borderWidth: border.width.hairline,
    justifyContent: AlignTypes.CENTER,
    margin: dimensions.spacingStackQuarck4,
    padding: dimensions.spacingStackThin3,
  },
});

export default styles;
