import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Row, Button, GradientBackground, InputText} from '../../../components';
import t from '../../../i18n';
import {Normalize} from '../../../utils';
import CreateHeader from '../createHeader';
import { PRIMARY_COLOR, STANDARD_TEXT_GREY } from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { createNft, uploadImageAndGetCid } from "../../../api";
import { Navigation } from "react-native-navigation";
import { CreateStep4ScreenDef } from "../step4";

const CreateStep3Screen = ({componentId, newNft}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [fee, setFee] = useState('')
  const [loading, setLoading] = useState('')


  const goNext = async () => {
    setLoading(true)
    const cid = await uploadImageAndGetCid(newNft.image)
    if (cid) {
      const createdNft = await createNft({...newNft, url: cid})
      console.log({createdNft})
      await Navigation.push(componentId, CreateStep4ScreenDef({ createdNft }))
    }
  }

  const disableNext = () => {
    return !(fee && name && description)
  }

  return (
    <GradientBackground style={styles.container}>
      <CreateHeader componentId={componentId} />
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}} style={{flex: 1}}>
        <Text style={styles.title}>{t('description')} [3/3]</Text>
        <Text style={styles.description}>{t('give some information about your NFT')}</Text>
        <Row/>
          <InputText label={t('name')} onChangeText={setName}/>
          <InputText label={t('description')} onChangeText={setDescription}/>
          <InputText label={t('seller fee')} onChangeText={setFee}/>
        <Row/>
      </KeyboardAwareScrollView>
      <Button text={t('continue')} onPress={goNext} disabled={disableNext()} loading={loading}/>
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
  }
});

export default CreateStep3Screen;
