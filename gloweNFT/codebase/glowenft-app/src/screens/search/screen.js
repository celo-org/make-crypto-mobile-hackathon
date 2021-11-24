import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import {Row, Button, GradientBackground, InputText } from "../../components";
import t from '../../i18n';
import { PRIMARY_COLOR, STANDARD_WHITE, WIDTH_DEVICE } from "../../constants";
import { Normalize } from "../../utils";
import { getAllNftFiltered } from "../../api";

const SearchScreen = ({ componentId }) => {

  const [search, setSearch] = useState('')
  const [nfts, setNfts] = useState([])

  useEffect(async () => {
    const nfts = await getAllNftFiltered(search)
    setNfts(nfts)
  }, [search])

  return (
    <GradientBackground style={styles.container}>
      <InputText label={t('search')} onChangeText={setSearch}/>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingTop: Normalize(20),
    paddingHorizontal: Normalize(15)
  },

});

export default SearchScreen;
