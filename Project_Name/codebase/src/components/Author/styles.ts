import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';

const style = StyleSheet.create({
  imageContainer: {
    borderColor: colors.light.neutralColor5,
    backgroundColor: colors.light.neutralColor12,
    borderWidth: border.width.hairline,
    borderRadius: border.radius.md6,
    padding: dimensions.spacingInlineThin2,
  },
  imageBorder: {
    borderRadius: border.radius.md6,
    overflow: 'hidden',
  },
  image: {
    height: dimensions.spacingStackXGiant30,
    width: dimensions.spacingStackXGiant30,
  },
  textContainer: {
    marginLeft: dimensions.spacingStackQuarck4,
    justifyContent: 'space-around',
  },
  wrapper: {
    flexDirection: 'row',
  },
});

export default style;
