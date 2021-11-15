import React, { useCallback } from 'react';

import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text } from '..';
import { colors, fontsFamily } from '../../styles';
import fontSizes from '../../styles/fontSizes';

import { styles } from './styles';

interface IInputProps {
  onChangeText: (param: number) => void;
  value: string | number;
  currency: string;
  minimumBid: number;
  valueFormatted: string;
  error?: boolean;
  onSubmitEnding?: () => void;
}

const InputBid = ({
  onChangeText,
  value,
  currency,
  minimumBid,
  error = false,
  valueFormatted,
  onSubmitEnding,
}: IInputProps): JSX.Element => {
  const styleManager = StyleSheet.create({
    currency: {
      borderColor: colors.light.neutralColor13,
    },
    inputView: {
      borderColor: colors.light.neutralColor13,
    },
  });
  const onChangeTextValue = useCallback(
    (value) => {
      onChangeText(value);
    },
    [onChangeText],
  );

  const errorText = value === '0' ? 'Please enter a valid number' : `Minimum bid is ${minimumBid}`;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.currency, error && styleManager.currency]}>
          <Text
            textDescription={currency}
            color={colors.light.neutralColor6}
            fontFamily={fontsFamily.montserrat.semiBold600}
            fontsSize={fontSizes.md16}
          />
        </View>
        <View style={[styles.inputView, error && styleManager.inputView]}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTextValue}
            value={String(value)}
            placeholder={`minimum bid ${minimumBid} ${currency}`}
            placeholderTextColor={colors.light.neutralColor8}
            keyboardType="numeric"
            onSubmitEditing={onSubmitEnding}
            maxLength={6}
          />
        </View>
      </View>
      <View style={styles.currencyFormatted}>
        <Text
          textDescription={
            error
              ? errorText
              : `${Number(valueFormatted).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })} USD`
          }
          color={error ? colors.light.neutralColor13 : colors.light.neutralColor6}
          fontFamily={fontsFamily.montserrat.medium500}
          fontsSize={fontSizes.xs12}
        />
      </View>
    </View>
  );
};

export default InputBid;
