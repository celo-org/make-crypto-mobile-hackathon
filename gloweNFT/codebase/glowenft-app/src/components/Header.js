import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {JTENERGY_BOLD, PRIMARY_COLOR, PRIMARY_GRADIENT, STANDARD_STATUS_BAR_HEIGHT, STANDARD_WHITE} from '../constants';
import Row from './Row';
import {Navigation} from 'react-native-navigation';
import {Normalize} from '../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient'
import t from '../i18n';
import { LoginScreenDef } from "../screens/login";
import { RegisterScreenDef } from "../screens/register";

export const Header = ({style, componentId}) => {
  const goBack = () => {
    Navigation.pop(componentId);
  };
  const goToLogin = () => {
    Navigation.push(componentId, RegisterScreenDef());
  };

  return (
    <View style={styles.wrapper}>
      <Row style={[styles.container, style]} noFlex>
        <TouchableOpacity style={styles.button} onPress={goToLogin}>
          <FontAwesome name={'user'} size={Normalize(25)} color={PRIMARY_COLOR}/>
        </TouchableOpacity>
        <Text style={styles.title}>{t('login')}</Text>
        {/*<TouchableOpacity style={styles.button}>*/}
        {/*  <FontAwesome5 name={'book'} size={Normalize(25)} color={STANDARD_WHITE}/>*/}
        {/*</TouchableOpacity>*/}
      </Row>
      <LinearGradient colors={['#000', 'transparent']} style={styles.gradient} start={{x: 1, y: 0}} end={{x: 1, y: 1.0}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: -Normalize(20),
  },
  container: {
    marginTop: STANDARD_STATUS_BAR_HEIGHT,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: STANDARD_WHITE,
    fontSize: Normalize(18),
    fontFamily: JTENERGY_BOLD,
    marginLeft: Normalize(10)
  },
  button: {
    paddingHorizontal: Normalize(10),
    paddingVertical: Normalize(10),
  },
  gradient: {
    height: Normalize(20)
  }
});
