import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Row, Button, GradientBackground, InputText} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Normalize } from "../../utils";
import { PRIMARY_COLOR, STANDARD_STATUS_BAR_HEIGHT } from "../../constants";
import { Navigation } from "react-native-navigation";

const CreateHeader = ({componentId}) => {
  useEffect(() => {}, []);

  const goBack = () => {
    Navigation.pop(componentId)
  };

  const close = () => {
    Navigation.popToRoot(componentId)
  };

  return (
    <Row style={styles.container} noFlex spaceBetween alignCenter>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <FontAwesome name={'angle-left'} size={Normalize(25)} color={PRIMARY_COLOR} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={close}>
        <FontAwesome name={'close'} size={Normalize(25)} color={PRIMARY_COLOR} />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: STANDARD_STATUS_BAR_HEIGHT,
    width: '100%',
    height: Normalize(40)
  }
});

export default CreateHeader;
