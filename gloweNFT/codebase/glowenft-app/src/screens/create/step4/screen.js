import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Row, Button, GradientBackground, InputText} from '../../../components';
import t from '../../../i18n';
import { getUrlByCid, Normalize } from "../../../utils";
import CreateHeader from '../createHeader';
import { PRIMARY_COLOR, STANDARD_TEXT_GREY, WIDTH_DEVICE } from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { createNft, uploadImageAndGetCid } from "../../../api";
import { Navigation } from "react-native-navigation";
import { CreateStep4ScreenDef } from "./index";
import Image from 'react-native-fast-image'

const CreateStep4Screen = ({createdNft, componentId}) => {


  const goNext = () => {
    Navigation.popToRoot(componentId)
  }

  console.log({createdNft})

  return (
    <GradientBackground style={styles.container}>

      <Image source={{uri: getUrlByCid(createdNft.url)}} style={styles.image}/>
      <Text style={styles.title}>{t('congratulations')}</Text>
      <Text style={styles.description}>Your painting has been created, choose if you want to publish it (on the blockchain) or make it private just on your account</Text>
      <Row />
      <Button text={t('finish')} onPress={goNext} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingHorizontal: Normalize(15),
    paddingTop: Normalize(80)
  },
  title: {
    fontSize: Normalize(20),
    fontWeight: '500',
    marginTop: Normalize(20)
  },
  description: {
    marginTop: Normalize(20),
    fontSize: Normalize(14),
    color: STANDARD_TEXT_GREY
  },
  image: {
    width: WIDTH_DEVICE - Normalize(30),
    height: Normalize(200),
    borderWidth: 1,
    borderRadius: 20,
    borderColor: PRIMARY_COLOR
  }

});

export default CreateStep4Screen;
