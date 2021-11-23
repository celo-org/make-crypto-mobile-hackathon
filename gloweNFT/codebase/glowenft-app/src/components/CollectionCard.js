import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { getUrlByCid, Normalize } from "../utils";
import { Logo } from "../assets";
import { PRIMARY_COLOR } from "../constants";
import Image from 'react-native-fast-image'
import { Navigation } from "react-native-navigation";
import { NftDetailScreenDef } from "../screens/nftDetail";

export const CollectionCard = ({nft, componentId}) => {

  const goToDetail = () => {
    Navigation.push(componentId, NftDetailScreenDef({selectedNft: nft}))
  }

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={styles.container}>
        <Image source={{uri: getUrlByCid(nft.url)}} style={styles.image}/>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: Normalize(130),
    borderRadius: 20,
    marginRight: Normalize(10),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  }


});

