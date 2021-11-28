import { colors, fontsFamily, fontsSize } from '@nft/styles';
import React from 'react';
import { View, Image, useWindowDimensions, ImageSourcePropType } from 'react-native';

import Text from '../Text';

import { styles } from './styles';

interface IOnboardingItemProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const OnboardingItem = ({ image, title, description }: IOnboardingItemProps): JSX.Element => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image source={image} style={[styles.image, { resizeMode: 'contain' }]} />

      <View style={styles.containerTitleDescription}>
        <Text
          textDescription={title}
          color={colors.light.neutralColor5}
          fontFamily={fontsFamily.montserrat.bold700}
          fontsSize={fontsSize.xl20}
        />

        <View style={styles.dividerText} />

        <Text
          textDescription={description}
          color={colors.light.neutralColor5}
          fontFamily={fontsFamily.montserrat.medium500}
          fontsSize={fontsSize.lg18}
        />
      </View>
    </View>
  );
};

export default OnboardingItem;
