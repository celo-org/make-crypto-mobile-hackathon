import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  ERROR_COLOR,
  isAndroid,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  STANDARD_WHITE,
  PRIMARY_DARK_COLOR,
  JTENERGY,
} from '../constants';
import _ from 'lodash';

import {TextInput as TextInputPaper} from 'react-native-paper';
import {Normalize} from '../utils';

export class InputText extends PureComponent {
  state = {
    showPassword: false,
  };

  constructor() {
    super();
  }

  componentDidMount() {}

  _renderTheme = () => {
    return {
      fonts: {regular: {fontFamily: JTENERGY}},
      colors: {
        placeholder: PRIMARY_COLOR,
        text: STANDARD_WHITE,
        primary: PRIMARY_COLOR,
      },
      roundness: 21
    };
  };

  render() {
    const {
      containerStyle,
      style,
      label,
      onChangeText,
      error,
      multiline,
      keyboardType,
      secureTextEntry,
      enableShowPassword,
      value,
      disabled,
      onLayout,
      theme: inputTheme,
      underlineColor,
      ...rest
    } = this.props;
    const {showPassword} = this.state;
    const isPasswordSecure = secureTextEntry && !showPassword;
    const theme = this._renderTheme();

    return (
      <View style={[styles.container, containerStyle]} onLayout={onLayout}>
        <TextInputPaper
          mode={'outlined'}
          label={label}
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          multiline={multiline}
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={isPasswordSecure}
          value={value}
          editable={!disabled}
          error={error || error === ''}
          selectionColor={SECONDARY_COLOR}
          activeColor={STANDARD_WHITE}
          underlineColor={underlineColor || 'rgba(255,255,255,0.5)'}
          {...rest}
          theme={inputTheme || theme}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconContainer: {
    marginHorizontal: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
    backgroundColor: 'black',
    fontSize: Normalize(16),
  },
});
