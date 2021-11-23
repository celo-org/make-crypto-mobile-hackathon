import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {
  Row,
  Button,
  GradientBackground,
  InputText,
  Col,
} from '../../components';
import t from '../../i18n';
import {PRIMARY_COLOR, STANDARD_WHITE, WIDTH_DEVICE} from '../../constants';
import {Normalize} from '../../utils';
import {apiOnBoarding} from '../../api';
import {useSelector} from 'react-redux';
import { getUserData, getUserToken } from "../../state/user";
import {MyProfileScreen} from '../myProfile';
import {Logo} from '../../assets';
import {Navigation} from 'react-native-navigation';
import {LoginScreenDef} from '../login';
import {RegisterScreenDef} from '../register';
import _ from 'lodash';

const OnBoardingScreen = ({componentId}) => {
  const token = useSelector(getUserToken);
  console.log({token});
  if (token) {
    return <MyProfileScreen componentId={componentId}/>;
  }

  const goToLogin = () => {
    Navigation.push(componentId, LoginScreenDef({}));
  };

  const goToSignUp = () => {
    Navigation.push(componentId, RegisterScreenDef({}));
  };

  return (
    <GradientBackground style={styles.container}>
      <Row />
      <Col style={{justifyContent: 'flex-end'}} alignCenter>
        <Image source={Logo} style={styles.image} />
        <Text style={styles.title}>GLOWE</Text>
      </Col>
      <Row />
      <Col style={{width: '100%'}}>
        <Button text={t('login')} onPress={goToLogin} />
        <Button
          style={styles.signUp}
          text={t('sign up')}
          secondary
          onPress={goToSignUp}
        />
      </Col>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingTop: Normalize(50),
    paddingHorizontal: Normalize(15),
    alignItems: 'center',
  },
  image: {
    height: WIDTH_DEVICE / 2,
    width: WIDTH_DEVICE / 2,
    resizeMode: 'contain',
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: Normalize(30),
    fontWeight: '700',
  },
  signUp: {
    marginTop: Normalize(20),
  },
  description: {
    color: STANDARD_WHITE,
    fontSize: Normalize(14),
    marginBottom: Normalize(20),
  },
});

export default OnBoardingScreen;
