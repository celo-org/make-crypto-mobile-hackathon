import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { Text } from '..';
import { colors, fontsFamily } from '../../styles';
import fontSizes from '../../styles/fontSizes';

import { styles } from './styles';

interface IProfileButton extends TouchableOpacityProps {
  label: string;
  isActive: boolean;
}

const ProfileButton = ({ label, isActive, ...rest }: IProfileButton): JSX.Element => {
  const styleManager = StyleSheet.create({
    container: {
      borderBottomColor: colors.light.neutralColor9,
    },
  });
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, !isActive && styleManager.container]}
      {...rest}>
      <Text
        textDescription={label}
        color={isActive ? colors.light.neutralColor4 : colors.light.neutralColor9}
        fontFamily={fontsFamily.montserrat.semiBold600}
        fontsSize={fontSizes.md16}
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;
