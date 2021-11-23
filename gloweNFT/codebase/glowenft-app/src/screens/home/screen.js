import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import {Row, Button, GradientBackground, InputText } from "../../components";
import t from '../../i18n';
import { PRIMARY_COLOR, STANDARD_WHITE, WIDTH_DEVICE } from "../../constants";
import { Normalize } from "../../utils";
import AppIntroSlider from 'react-native-app-intro-slider';
import { Logo, SlidesImage } from "../../assets";

const slides = [
  {
    key: 'one',
    title: 'Home',
    text: 'Description.\nSay something cool',
    image: Logo,
  },
  {
    key: 'two',
    title: 'Home',
    text: 'Description.\nSay something cool',
    image: SlidesImage,
  },
  {
    key: 'three',
    title: 'Home',
    text: 'Description.\nSay something cool',
    image: SlidesImage,
  }
];

const LoginScreen = ({ componentId }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
  }, []);

  const login = () => {

  };

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }


  return (
    <GradientBackground style={styles.container}>
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.textSkip}>{t('skip')}</Text>
      </TouchableOpacity>

      <AppIntroSlider renderItem={_renderItem} data={slides} onDone={() => {}}
                      dotStyle={{borderColor: PRIMARY_COLOR, borderWidth: 1}}/>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingTop: Normalize(50),
    paddingHorizontal: Normalize(15)
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: Normalize(28),
    fontWeight: '700'
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
    alignSelf: 'flex-end'
  },
  text: {
    color: STANDARD_WHITE,
    fontSize: Normalize(18),

  },
  textSkip: {
    color: PRIMARY_COLOR,

  },
  image: {
    width: WIDTH_DEVICE / 1.5,
    height: WIDTH_DEVICE / 1.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 15
  },
  slide: {
    flex: 1
  }
});

export default LoginScreen;
