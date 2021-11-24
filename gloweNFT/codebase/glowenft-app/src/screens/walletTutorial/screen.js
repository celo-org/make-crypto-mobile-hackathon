import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GradientBackground} from '../../components';
import {PRIMARY_COLOR, STANDARD_WHITE, WIDTH_DEVICE} from '../../constants';
import {Normalize} from '../../utils';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  WalletImage1,
  WalletImage2,
  WalletImage3,
} from '../../assets';
import {Navigation} from 'react-native-navigation';

const slides = [
  {
    key: 'one',
    title: 'What is a wallet',
    text: 'A crypto wallet is an electronic wallet dedicated exclusively to the management of cryptocurrencies',
    image: WalletImage1,
  },
  {
    key: 'two',
    title: 'What is a private key',
    text: 'A private key is a cryptographic key used in an asymmetric cryptographic system. Each private key is associated with a public key',
    image: WalletImage2,
  },
  {
    key: 'three',
    title: 'Why',
    text: 'To ensure maximum safety',
    image: WalletImage3,
  },
];

const WalletTutorialScreen = ({componentId}) => {

  const onDone = () => {
    Navigation.pop(componentId);
  };

  const _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  return (
    <GradientBackground style={styles.container}>
      {/*<TouchableOpacity style={styles.skipButton}>*/}
      {/*  <Text style={styles.textSkip}>{t('skip')}</Text>*/}
      {/*</TouchableOpacity>*/}

      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={onDone}
        dotStyle={{borderColor: PRIMARY_COLOR, borderWidth: 1}}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingTop: Normalize(50),
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: Normalize(28),
    fontWeight: '700',
  },
  description: {
    color: STANDARD_WHITE,
    fontSize: Normalize(14),
    marginBottom: Normalize(20),
  },
  skipButton: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    flex: 0,
    borderRadius: 40,
    width: 60,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  text: {
    color: STANDARD_WHITE,
    fontSize: Normalize(18),
    marginTop: Normalize(10)
  },
  textSkip: {
    color: PRIMARY_COLOR,
  },
  image: {
    width: WIDTH_DEVICE / 1.5,
    height: WIDTH_DEVICE / 1.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 15,
  },
  slide: {
    paddingHorizontal: Normalize(15),
    flex: 1,
  },
});

export default WalletTutorialScreen;
