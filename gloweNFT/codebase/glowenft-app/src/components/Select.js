import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';

export class DropDown extends React.Component {


  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    return (
      <View>

        {/*<Dropdown*/}
        {/*  label='Favorite Fruit'*/}
        {/*  data={data}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
