import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PRIMARY_COLOR, STANDARD_GREY, STANDARD_GREY_LIGHT, STANDARD_WHITE, WIDTH_DEVICE} from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import { Switch as SwitchPaper } from 'react-native-paper';
import t from '../i18n';


export class RowEvolution extends Component {

  state = {
    intensityType: [1, 2, 3, 4, 5],
    intensitySelected: 0,
  }

  _pressIntensity = (val) => {
    this.setState({ intensitySelected: val})
    this.props.onChangeIntensity(val)
  }

  render() {

    const { intensityType, intensitySelected } = this.state;
    const { status, onPress, label, showRate, openBottom } = this.props;

    return (

      <View style={[styles.container, openBottom && status && { borderBottomWidth: 0 }]} >
        <Text style={styles.label}>{label}</Text>
        {status && showRate &&
          <View style={styles.rawRate}>
            <Text style={styles.intensityText}>{t('intensity')}</Text>
            <View style={styles.group}>
              {intensityType.map(val => {
                return (
                  <TouchableOpacity key={val.toString()} style={[styles.wrap, intensitySelected >= val && { backgroundColor: PRIMARY_COLOR }]}
                                    onPress={() => this._pressIntensity(val)}>
                    <Text style={[styles.number, intensitySelected >= val && { color: STANDARD_WHITE }]}>{val}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        }
        <SwitchPaper color={PRIMARY_COLOR} value={status} onValueChange={onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0,
    flexDirection: 'row',
    height: 65,
  },
  label: {
    flex: 1,
    fontSize: 15
  },
  square: {
    borderColor: STANDARD_GREY,
    borderWidth: 2,
    height: 26,
    width: 26,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerCircle: {
    height: 14,
    width: 14,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12
  },
  intensityText: {
    fontSize: 14,
    marginBottom: 4
  },
  rawRate: {
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrap: {
    backgroundColor: STANDARD_GREY_LIGHT,
    height: WIDTH_DEVICE / 13,
    width: WIDTH_DEVICE / 13,
    borderRadius: WIDTH_DEVICE / 6.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {

  }

});

