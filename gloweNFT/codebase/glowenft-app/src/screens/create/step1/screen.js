import React, {useEffect, useState} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Row, Button, GradientBackground, InputText} from '../../../components';
import t from '../../../i18n';
import { Normalize, showImagePicker } from "../../../utils";
import CreateHeader from '../createHeader';
import { PRIMARY_COLOR, STANDARD_TEXT_GREY } from "../../../constants";
import { Navigation } from "react-native-navigation";
import { CreateStep2ScreenDef } from "../step2";

const CreateStep1Screen = ({componentId}) => {
  const [image, setImage] = useState(null)

  const goNext = () => {
    Navigation.push(componentId, CreateStep2ScreenDef({newNft: {image}}))
  }

  const uploadImage = async () => {
    const image = await showImagePicker()
    if (image && image[0]) {
      setImage(image[0])
    }
    console.log({image})
  }
  const disableNext = () => {
    return !image
  }

  return (
    <GradientBackground style={styles.container}>
      <CreateHeader componentId={componentId} />
      <Text style={styles.title}>{t('upload a file')} [1/3]</Text>
      <Text style={styles.description}>{t('you can upload a')} .png, .jpeg, .gif ...</Text>
      <Row/>
      <TouchableOpacity style={styles.uploadBox} onPress={uploadImage}>
        {!!image ? <Image source={{uri: image}} style={styles.image}/> :
        <Text style={styles.textChoose}>{t('choose a file')}</Text> }
      </TouchableOpacity>
      <Row/>
      <Button text={t('continue')} onPress={goNext} disabled={disableNext()}/>
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
    height: '100%',
    width: '100%',
    borderRadius: 20,
  }
});

export default CreateStep1Screen;
