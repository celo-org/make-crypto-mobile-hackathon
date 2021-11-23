import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {JTENERGY_SEMI_BOLD, PRIMARY_COLOR, STANDARD_WHITE, WIDTH_DEVICE} from '../constants';
import {Normalize} from '../utils';
import Row from './Row';
import _ from 'lodash';

export const HeaderTab = ({ onSelect, style, initialButtons }) => {

  const [buttons, setButtons] = useState(initialButtons);
  console.log({buttons})

  const _onPressButton = (button) => {
    onSelect(button.id)
    const index = buttons.findIndex(btn => btn.id === button.id)
    const newButtons = buttons.map(btn => ({...btn, isSelected: false}))
    newButtons[index].isSelected = true;
    setButtons([...newButtons]);
  }

  const _renderButton = (button) => {
    return (
      <TouchableOpacity key={button.id} style={[styles.container, button.isSelected && styles.selected]} onPress={() => _onPressButton(button)}>
        <Text style={styles.text}>{button.label}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <Row width={WIDTH_DEVICE} noFlex>
      {_.map(buttons, button => _renderButton(button))}
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: Normalize(18),
    fontFamily: JTENERGY_SEMI_BOLD,
    color: STANDARD_WHITE
  },
  selected: {
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR,
  }


});

export default HeaderTab
