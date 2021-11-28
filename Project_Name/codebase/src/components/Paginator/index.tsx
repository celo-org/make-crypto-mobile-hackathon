import { colors, fontsFamily, fontsSize } from '@nft/styles';
import React from 'react';
import { View, Animated, useWindowDimensions, Dimensions } from 'react-native';
import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';

import TextComponent from '../Text';

import { styles } from './styles';

interface IPaginatorProps {
  key: string;
  title: string;
  description: string;
  image: string;
}

interface IDataProps extends BorderlessButtonProps {
  data: Array<IPaginatorProps>;
  scrollX: Animated.Value;
  label: string;
}

const Paginator = ({ data, scrollX, label, ...rest }: IDataProps): JSX.Element => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.containerDots}>
        {data.map((_, index: number) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 10, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={index.toString()}
            />
          );
        })}
      </View>

      <BorderlessButton {...rest}>
        <TextComponent
          textDescription={label}
          fontFamily={fontsFamily.montserrat.semiBold600}
          fontsSize={fontsSize.md16}
          color={colors.light.neutralColor5}
        />
      </BorderlessButton>
    </View>
  );
};

export default Paginator;
