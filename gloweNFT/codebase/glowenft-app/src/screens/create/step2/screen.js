import React, {useEffect, useState} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Row, Button, GradientBackground, InputText} from '../../../components';
import t from '../../../i18n';
import {Normalize} from '../../../utils';
import CreateHeader from '../createHeader';
import { PRIMARY_COLOR, STANDARD_TEXT_GREY } from "../../../constants";
import { Navigation } from "react-native-navigation";
import { CreateStep3ScreenDef } from "../step3";
import { IntroImage1 } from "../../../assets";

const CreateStep2Screen = ({componentId, newNft}) => {
  const [copies, setCopies] = useState('1')

  const goNext = () => {
    newNft.copies = copies
    Navigation.push(componentId, CreateStep3ScreenDef({newNft}))
  }

  const disableNext = () => {
    return !copies
  }

  return (
    <GradientBackground style={styles.container}>
      <CreateHeader componentId={componentId} />
      <Text style={styles.title}>{t('copies')} [2/3]</Text>
      <Text style={styles.description}>{t('select how many copies you would like of your nft')}</Text>
      <Row/>
      <Row>
        <Image source={IntroImage1} style={styles.image}/>
        <InputText label={t('total copies')} onChange={setCopies} containerStyle={styles.copies} keyboardType={'numeric'} value={copies}/>
      </Row>
      <Row/>
      <Button text={t('continue')} onPress={goNext} disable={disableNext()} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingHorizontal: Normalize(15),
  },
  title: {
    fontSize: Normalize(20),
    fontWeight: '500',
  },
  description: {
    marginTop: Normalize(20),
    fontSize: Normalize(14),
    color: STANDARD_TEXT_GREY
  },
  uploadBox: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 20,
    height: Normalize(180),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textChoose: {
    textAlign: 'center'
  },
  image: {
    height: Normalize(100),
    width: Normalize(100),
    resizeMode: 'contain'
  },
  copies: {
    flex: 1
  }
});

export default CreateStep2Screen;
