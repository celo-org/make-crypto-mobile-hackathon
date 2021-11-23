import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  Row,
  Button,
  GradientBackground,
  InputText,
  Header,
  CollectionCard,
  Artist
} from '../../components';
import t from '../../i18n';
import { PRIMARY_COLOR, STANDARD_STATUS_BAR_HEIGHT, STANDARD_WHITE, WIDTH_DEVICE } from "../../constants";
import {Normalize} from '../../utils';
import { apiRegister, getAllArtist, getAllNft } from "../../api";
import { TestImage1, TestImage2, TestImage3 } from "../../assets";
import { useSelector } from "react-redux";
import { getStateAllNft } from "../../state/user";

const LoginScreen = ({componentId}) => {
  const [artists, setArtist] = useState([])
  const nfts = useSelector(getStateAllNft)

  useEffect(() => {
    getAllNft()
    getAllArtist().then(artistsRes => {
      setArtist(artistsRes)
    })
  }, []);

  const renderCollection = ({item}) => {
    return <CollectionCard nft={item} componentId={componentId}/>;
  };
  const renderArtist = ({item}) => {
    return <Artist artist={item} />;
  };

  return (
    <GradientBackground style={styles.container}>
      {/*<Header componentId={componentId}/>*/}
      <Text style={styles.title}>{t('collection')}</Text>
      <FlatList
        data={nfts}
        renderItem={renderCollection}
        keyExtractor={item => item._id}
        horizontal={true}
        contentContainerStyle={styles.flatListContent}
        style={{flex: 1}}
      />
      <Text style={styles.title}>{t('artist')}</Text>

      <FlatList
        data={artists}
        renderItem={renderArtist}
        keyExtractor={item => item._id}
        // horizontal={true}
        contentContainerStyle={styles.flatListContent}
        style={{flex:1}}
        horizontal={false}
        numColumns={2}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingTop: STANDARD_STATUS_BAR_HEIGHT
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: Normalize(20),
    fontWeight: '700',
    marginLeft: Normalize(10),
    marginBottom: Normalize(10),

  },
  description: {
    color: STANDARD_WHITE,
    fontSize: Normalize(14),
    marginBottom: Normalize(20),
  },
  flatListContent: {
    paddingHorizontal: Normalize(10),
    paddingBottom: 20
  }
});

export default LoginScreen;
