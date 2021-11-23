import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, Text, FlatList } from "react-native";
import {
  Col,
  Row,
  Button,
  GradientBackground,
  InputText, CollectionCard,
} from "../../components";
import t from '../../i18n';
import {PRIMARY_COLOR, STANDARD_WHITE, WIDTH_DEVICE} from '../../constants';
import {Normalize} from '../../utils';
import { Logo, TestImage1, TestImage2 } from "../../assets";
import { Navigation } from "react-native-navigation";
import { LoginScreenDef } from "../login";
import { RegisterScreenDef } from "../register";
import { useDispatch, useSelector } from "react-redux";
import { getStateAllNft, getStateMyNft, getUserData, setUserData, setUserToken } from "../../state/user";
import { CreateStep1ScreenDef } from "../create/step1";
import { WalletTutorialScreenDef } from "../walletTutorial";
import { getAllNft } from "../../api";

const MyProfileScreen = ({componentId}) => {
  const userData = useSelector(getUserData)
  const dispatch = useDispatch()
  const myNfts = useSelector(getStateMyNft)

  const goToCreate = () => {
    Navigation.push(componentId, CreateStep1ScreenDef())
  }

  useEffect(() => {
    getAllNft()
  }, [])

  const logout = () => {
    dispatch(setUserData(null))
    dispatch(setUserToken(null))
  }

  const renderCollection = ({item}) => {
    return <CollectionCard nft={item} componentId={componentId}/>;
  };

  console.log({my: myNfts})

  return (
    <GradientBackground style={styles.container}>
      <Image source={TestImage2} style={styles.background}/>
      <Image source={TestImage1} style={styles.profile}/>
      <Text style={styles.username}>{userData.username}</Text>
      {/*<Button text={t('edit profile')} onPress={goToCreate}/>*/}
      <Text style={styles.title}>{t('my collections')}</Text>
      <FlatList
        data={myNfts}
        renderItem={renderCollection}
        keyExtractor={item => item._id}
        horizontal={true}
        contentContainerStyle={styles.flatListContent}
        style={{flex: 1}}
      />
      <Button text={t('create nft')} onPress={goToCreate}/>
      <Button text={t('logout')} onPress={logout}/>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: WIDTH_DEVICE,
    height: Normalize(150)
  },
  profile: {
    width: WIDTH_DEVICE / 3,
    height: WIDTH_DEVICE / 3,
    borderRadius: WIDTH_DEVICE / 3,
    alignSelf: 'center',
    marginTop: - WIDTH_DEVICE / 6,
    borderWidth: 2,
  },
  username: {
    textAlign: 'center',
    fontSize: Normalize(20),
    fontWeight: '800',
    marginTop: Normalize(10)
  },
  flatListContent: {
    paddingHorizontal: Normalize(10),
    paddingBottom: 20
  },
  title: {
    marginTop: Normalize(20),
    color: PRIMARY_COLOR,
    fontSize: Normalize(20),
    fontWeight: '700',
    marginLeft: Normalize(10),
    marginBottom: Normalize(10),

  },
});

export default MyProfileScreen;
