// @flow
import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {Row, TranslatedText} from '../../../commons';
import {LIGHT_BLACK, PRIMARY_COLOR} from '../../../utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';



type Props = {
  icon: any,
  text: any,
  onPress: Function,
  hasSubMenu?: boolean
};

const SubMenuPlantVoice = ({ plant, onPress, selectedPlantId }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(plant._id)}>
      <Row style={styles.row}>
        <TranslatedText style={styles.text}>{plant.name}</TranslatedText>
        <View style={styles.subMenuWrapper}>
          <Ionicons name={plant._id === selectedPlantId ? 'ios-radio-button-on' : 'ios-radio-button-off' } color={PRIMARY_COLOR} size={20}/>
        </View>
      </Row>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  row: {
    flex: 0,
    height: 70,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_BLACK,
    alignItems: 'center'
  },
  iconWrapper: {
    marginRight: 20
  },
  text: {
    fontSize: 16,
    flex: 1
  },
  subMenuWrapper: {
    paddingRight: 20
  }
});

export default SubMenuPlantVoice;
