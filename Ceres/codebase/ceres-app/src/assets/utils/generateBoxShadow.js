import {Platform} from 'react-native';

export const generateBoxShadow = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  borderWidth,
  shadowColorAndroid,
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    return {
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.10)',
    };
  }
};
