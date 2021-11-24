// @flow
import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {Row, TranslatedText} from '../../../commons';
import {LIGHT_BLACK, PRIMARY_COLOR} from '../../../utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from '../screen';


type Props = {
  icon: any,
  text: any,
  onPress: Function,
  hasSubMenu?: boolean
};

const MenuVoice = ({ icon, text, onPress, hasSubMenu }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row style={styles.row}>
        <View style={styles.iconWrapper}>
          {icon}
        </View>
        <TranslatedText style={styles.text}>{text}</TranslatedText>
        {
          hasSubMenu &&
          <View style={styles.subMenuWrapper}>
            <Icon name="angle-right" color={PRIMARY_COLOR} size={20}/>
          </View>
        }
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

export default MenuVoice;
