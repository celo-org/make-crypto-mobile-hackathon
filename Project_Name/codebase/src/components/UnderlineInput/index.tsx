import React, { useCallback } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Text } from '@nft/components';
import { colors, dimensions, fontsFamily } from '@nft/styles';
import fontSizes from '../../styles/fontSizes';
import styles from './style';

interface IUnderlineInputProps extends TextInputProps {
  onChangeText: (param: string | number) => void;
  text: string | number;
  label: string;
  placeholder: string;
  isOptional?: boolean;
  optionalCurrency?: string;
  hasError?: boolean;
}

const UnderlineInput = ({
  onChangeText,
  text,
  label,
  isOptional,
  placeholder,
  optionalCurrency,
  hasError = false,
  ...rest
}: IUnderlineInputProps) => {
  const onChangeTextValue = useCallback(
    (value) => {
      onChangeText(value);
    },
    [onChangeText],
  );

  const styleManager = StyleSheet.create({
    input: {
      paddingRight: optionalCurrency ? dimensions.spacingStackXxHuge65 : 0,
    },
    inputView: {
      borderBottomColor: colors.light.neutralColor13,
    },
  });
  return (
    <View>
      <View style={styles.labelContainer}>
        <Text
          textDescription={label}
          color={hasError ? colors.light.neutralColor13 : colors.light.neutralColor4}
          fontFamily={fontsFamily.montserrat.regular400}
          fontsSize={fontSizes.xl20}
        />
        {isOptional && (
          <View style={styles.optionalText}>
            <Text
              textDescription={'(Optional)'}
              color={hasError ? colors.light.neutralColor13 : colors.light.neutralColor4}
              fontFamily={fontsFamily.montserrat.regular400}
              fontsSize={fontSizes.sm14}
            />
          </View>
        )}
      </View>
      <View>
        <TextInput
          onChangeText={onChangeTextValue}
          value={String(text)}
          placeholder={placeholder}
          style={[styles.input, styleManager.input, hasError && styleManager.inputView]}
          {...rest}
        />
        {optionalCurrency && (
          <Text
            textDescription={optionalCurrency}
            color={colors.light.neutralColor5}
            fontFamily={fontsFamily.montserrat.semiBold600}
            fontsSize={fontSizes.sm14}
            style={styles.optionalCurrency}
          />
        )}
      </View>
    </View>
  );
};

export default UnderlineInput;
