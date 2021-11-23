
import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet, TouchableOpacity,
  View, Text
} from 'react-native'
import Row from "./Row";
import {PRIMARY_COLOR, STANDARD_GREY} from "../constants";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'

export class CitySelection extends Component {

  _renderCity = ( item ) => {
    return (
      <TouchableOpacity key={item.locality.name} style={styles.rowCity} onPress={() => this.props.onSelect(item)}>
        <Text style={styles.locality}>{item.locality.name}</Text>
        <MaterialIcons
          name={'add-circle'}
          size={30}
          color={STANDARD_GREY}
        />
      </TouchableOpacity>
    )
  }

  render() {
    const { cities, style } = this.props
    return (
      <View style={[styles.container, style]}>

        {_.map(cities, city => {
          return this._renderCity(city)
        })}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  rowCity: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: STANDARD_GREY,
    width: '100$%',
    height: 50,
    alignItems: 'center',
  },
  locality: {
    fontSize: 20,
  }
})

