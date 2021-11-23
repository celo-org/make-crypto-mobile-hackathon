import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import t from '../../i18n';
import {getUrlByCid, Normalize} from '../../utils';
import {PRIMARY_COLOR, STANDARD_TEXT_GREY, WIDTH_DEVICE} from '../../constants';
import {Navigation} from 'react-native-navigation';
import Image from 'react-native-fast-image';
import {Row, Button, GradientBackground} from '../../components';

const NftDetailScreen = ({selectedNft, componentId}) => {
  const goNext = () => {
    // Navigation.popToRoot(componentId);
  };

  console.log({selectedNft});

  return (
    <GradientBackground style={styles.container}>
      <Image
        source={{uri: getUrlByCid(selectedNft.url)}}
        style={styles.image}
      />
      <Text style={styles.title}>{selectedNft.name}</Text>
      <Text style={styles.description}>{selectedNft.description}</Text>
      <Text style={styles.description}>Copies: {selectedNft.number}</Text>
      <Row />
      <Button text={t('bid')} onPress={goNext} />
      <Button text={t('buy instantly')} onPress={goNext} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingHorizontal: Normalize(15),
    paddingTop: Normalize(80),
  },
  title: {
    fontSize: Normalize(20),
    fontWeight: '500',
    marginTop: Normalize(20),
  },
  description: {
    marginTop: Normalize(20),
    fontSize: Normalize(14),
    color: STANDARD_TEXT_GREY,
  },
  image: {
    width: WIDTH_DEVICE - Normalize(30),
    height: Normalize(200),
    borderWidth: 1,
    borderRadius: 20,
    borderColor: PRIMARY_COLOR,
  },
});

export default NftDetailScreen;
