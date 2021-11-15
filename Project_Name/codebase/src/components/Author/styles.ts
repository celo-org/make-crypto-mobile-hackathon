import { StyleSheet } from 'react-native';
import { border, colors, dimensions } from '../../styles';

const style = StyleSheet.create({
  imageContainer: {
    backgroundColor: colors.light.neutralColor12,
    borderWidth: border.width.thick,
    borderRadius: border.radius.md6,
    padding: dimensions.spacingStackThin3,
  },
  imageBorder: {
    borderRadius: border.radius.md6,
    overflow: 'hidden',
  },
  image: {
    height: dimensions.spacingStackXHuge40,
    width: dimensions.spacingStackXHuge40,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginLeft: dimensions.spacingStackXs8,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default style;
