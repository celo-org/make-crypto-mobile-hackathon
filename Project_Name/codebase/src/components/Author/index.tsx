import React from 'react';
import {
  Image,
  ImageSourcePropType,
  View,
  StyleSheet,
  ImageBackground,
  ImageBackgroundProps,
} from 'react-native';
import { Text } from '@nft/components';
import { colors, fontsFamily, fontsSize } from '@nft/styles';
import style from './styles';

interface IAuthorProps {
  authorName: string;
  authorImage: {
    uri: string;
  };
}

const Author = ({ authorName, authorImage }: IAuthorProps): JSX.Element => {
  return (
    <View style={style.wrapper}>
      <View style={style.imageContainer}>
        <View style={style.imageBorder}>
          <ImageBackground style={style.image} source={authorImage} />
        </View>
      </View>
      <View style={style.textContainer}>
        <Text
          textDescription={'Author'}
          color={colors.light.neutralColor5}
          fontsSize={fontsSize.xxs10}
          fontFamily={fontsFamily.montserrat.medium500}
        />
        <Text
          textDescription={authorName}
          color={colors.light.neutralColor5}
          fontsSize={fontsSize.xs12}
          fontFamily={fontsFamily.montserrat.medium500}
        />
      </View>
    </View>
  );
};

export default Author;
