import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View} from "react-native";

import {AppText} from "./AppText";
import AppIcon from "./assets/AppIcon";
import {requestAccountAddress} from "@celo/dappkit";
import {callback, dappName, loginRequestId} from "./constants";
import {StatusBar} from "expo-status-bar";

interface Props {
}
export const ConnectToValoraView: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false)

  const connectValora = async () => {
    setLoading(true)

    requestAccountAddress({
      requestId: loginRequestId,
      dappName,
      callback,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/illustration_connect_wallet.jpeg')} style={{resizeMode: 'cover', width: '101%', height: '101%'}}/>
      <View>
        {/*<AppIcon type={'illustration_one'}/>*/}
      </View>

      <View style={{position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', paddingHorizontal: 24}}>
        <TouchableOpacity activeOpacity={0.9} style={styles.connectButton} onPress={connectValora}>
          {!loading && <AppIcon type={'walletIcon'}/>}
          {loading && <ActivityIndicator color={'white'} style={{width: 32, height: 32}}/>}
          <View style={{marginStart: 16}}/>
          <AppText fontSize={18} fontFamily={'bold'}>Valora</AppText>
          <View style={{flex: 1}}/>
          <AppIcon type={'icArrow'}/>
        </TouchableOpacity>
        <AppText color={'white'} fontSize={12} lineHeight={20} style={{textAlign: 'center'}}>
          By connecting your wallet, you agree to our{'\n'}
          Terms of Service and our Privacy Policy.
        </AppText>
        <Image source={require('./assets/powerred_by.png')} style={{height: 27, resizeMode: 'center', marginTop: 56}}/>
      </View>
      <StatusBar backgroundColor={'rgb(54, 57, 68)'} style={'light'} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#141416',
    alignItems: 'center',
    justifyContent: 'center'
  },

  connectButton: {
    backgroundColor: 'rgb(54, 57, 68)',
    borderRadius: 16,
    width: '100%',
    height: 64,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16
  }
})
