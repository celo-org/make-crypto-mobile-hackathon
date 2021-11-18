import React, { useCallback } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { Text } from '..';
import { colors, fontsFamily } from '../../styles';
import fontSizes from '../../styles/fontSizes';
import styles from './style';

interface IUnderlineInputProps {
  onChangeText: (param: number) => void;
  label: string;
  placeholder: string;
  isOptional: boolean;
}

const UnderlineInput = ({ onChangeText, label, isOptional, placeholder }: IUnderlineInputProps) => {
  const onChangeTextValue = useCallback(
    (value) => {
      onChangeText(value);
    },
    [onChangeText],
  );
  return (
    <View>
      <View style={styles.labelContainer}>
        <Text
          textDescription={label}
          color={colors.light.neutralColor4}
          fontFamily={fontsFamily.montserrat.regular400}
          fontsSize={fontSizes.xl20}
        />
        {isOptional && (
          <Text
            textDescription={'Optional'}
            color={colors.light.neutralColor7}
            fontFamily={fontsFamily.montserrat.regular400}
            fontsSize={fontSizes.sm14}
          />
        )}
      </View>
      <TextInput onChangeText={onChangeTextValue} placeholder={placeholder} style={styles.input} />
    </View>
  );
};

export default UnderlineInput;
