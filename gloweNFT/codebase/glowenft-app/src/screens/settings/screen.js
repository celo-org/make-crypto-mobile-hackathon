import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {
  Logo,
} from '../../assets';
import {Navigation} from 'react-native-navigation';
import {WalletTutorialScreenDef} from '../walletTutorial';

const SettingsScreen = ({componentId}) => {
  const goToWalletTutorial = () => {
    Navigation.push(componentId, WalletTutorialScreenDef());
  };

  return (
    <GradientBackground style={styles.container}>
      <Row />
      <Col style={{justifyContent: 'flex-end'}} alignCenter>
        <Image source={Logo} style={styles.image} />
        <Text style={styles.title}>GLOWE</Text>
      </Col>
      <Row />
      <Button text={t('wallet tutorial')} onPress={goToWalletTutorial} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingTop: Normalize(50),
    paddingHorizontal: Normalize(15),
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
});

export default SettingsScreen;
