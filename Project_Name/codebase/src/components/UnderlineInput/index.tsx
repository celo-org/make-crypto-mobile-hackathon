import React, { useCallback } from 'react';
import { TextInput, View } from 'react-native';
import { Text } from '@nft/components';
import { colors, fontsFamily } from '@nft/styles';
import fontSizes from '../../styles/fontSizes';
import styles from './style';

interface IUnderlineInputProps {
  onChangeText: (param: number) => void;
  text: string;
  label: string;
  placeholder: string;
  isOptional?: boolean;
}

const UnderlineInput = ({
  onChangeText,
  text,
  label,
  isOptional,
  placeholder,
}: IUnderlineInputProps) => {
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
          <View style={styles.optionalText}>
            <Text
              textDescription={'(Optional)'}
              color={colors.light.neutralColor7}
              fontFamily={fontsFamily.montserrat.regular400}
              fontsSize={fontSizes.sm14}
            />
          </View>
        )}
      </View>
      <TextInput
        onChangeText={onChangeTextValue}
        value={String(text)}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

export default UnderlineInput;
