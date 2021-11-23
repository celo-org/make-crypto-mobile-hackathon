import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Normalize } from "../utils";
import Col from "./Col";
import { WIDTH_DEVICE } from "../constants";
import { TestImage1 } from "../assets";
import { Navigation } from "react-native-navigation";

export const Artist = ({artist, componentId}) => {

  const goToUserDetail = () => {
    // Navigation.push(componentId)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={goToUserDetail}>
      <Image source={artist.image || TestImage1} style={styles.image}/>
      <Col flexStart style={{height: '100%'}}>
        <Text style={styles.name}>{artist.username}</Text>
      </Col>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginRight: Normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH_DEVICE / 2 - Normalize(10),
    marginBottom: Normalize(30)
  },
  image: {
    resizeMode: 'cover',
    width: Normalize(50),
    height: Normalize(50),
    borderRadius: 100,
  },
  name: {
    marginLeft: 10,
    fontSize: Normalize(12),
    marginTop: 10
  }


});

