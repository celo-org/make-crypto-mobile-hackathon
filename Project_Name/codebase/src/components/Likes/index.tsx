import React from 'react';

import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';

import HeartSvg from '../../../assets/heart.svg';
import HeartFilledSvg from '../../../assets/heart-filled.svg';

import { styles } from './styles';
import { Text } from '..';
import { AlignTypes } from '../../utils/enum';
import { View } from 'react-native';

interface ILikeProps extends BorderlessButtonProps {
  isLiked?: boolean;
  numberOfLikes: number;
  likeFunction: () => void;
  textColor: string;
  textFontFamily: string;
  textFontSize: number;
  textAlign?: AlignTypes;
}

const Likes = ({
  isLiked = false,
  numberOfLikes,
  likeFunction,
  textColor,
  textAlign,
  textFontFamily,
  textFontSize,
  ...rest
}: ILikeProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <BorderlessButton {...rest} onPress={likeFunction}>
        {isLiked ? <HeartFilledSvg style={styles.icon} /> : <HeartSvg style={styles.icon} />}
      </BorderlessButton>
      <Text
        textDescription={numberOfLikes}
        color={textColor}
        textAlign={textAlign}
        fontFamily={textFontFamily}
        fontsSize={textFontSize}
      />
    </View>
  );
};

export default Likes;
