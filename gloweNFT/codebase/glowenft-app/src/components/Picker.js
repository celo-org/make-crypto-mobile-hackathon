import React, { PureComponent } from 'react';
import {StyleSheet, Picker as NativePicker, TouchableWithoutFeedback, TouchableOpacity, View, FlatList} from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import _ from 'lodash'
import {HEIGHT_DEVICE, PRIMARY_COLOR, STANDARD_BOTTOM_SPACE, STANDARD_WHITE, WIDTH_DEVICE} from '../constants';
// import Row from './Row';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Normalize} from '../utils';
import Row from "./Row";


export class Picker extends PureComponent {

  // Componente working progress
  state = {
    visible: false,
    values: [],
    title: '',
  }

  componentDidMount() {

  };

  _onChangeValue = (newValue) => {
    console.log({newValue})
    this.setState({ selectedValue: newValue })
  }

  _showModal = (values, title) => {
    this.setState({ visible: true, values, title });
  }


  _hideModal = () => {
    const { onClose } = this.props;
    onClose(null)
    this.setState({ visible: false })
  }

  _selectItem = (item) => {
    const { onClose } = this.props;
    onClose(item)
    this.setState({ visible: false })
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => this._selectItem(item)}>
        <Text style={styles.rowText}>{item.value}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { } = this.props;
    const { visible, selectedValue, values, title } = this.state;
    console.log({values})
    return (
      <Portal>
        <Modal visible={visible} onDismiss={this._hideModal}>
          <View style={{width: WIDTH_DEVICE, height: HEIGHT_DEVICE}}>
            <TouchableWithoutFeedback  onPress={this._hideModal}>
              <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

            <View style={styles.footer}>
              <Row style={styles.footerTop}>
                <Text style={styles.textTitle}>{title}</Text>
                <TouchableOpacity onPress={this._hideModal}>
                  <MaterialCommunityIcons name={'close'} color={PRIMARY_COLOR} size={30}/>
                </TouchableOpacity>
              </Row>
              <FlatList
                data={values}
                keyExtractor={(item) => item.key}
                renderItem={this._renderItem}
                style={styles.picker}
                contentContainerStyle={{paddingBottom: 60 + STANDARD_BOTTOM_SPACE}}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    height: 250,
    width: WIDTH_DEVICE,
    paddingTop: 20,
  },
  footer: {
    backgroundColor: '#F5F5FB',
  },
  footerTop: {
    width: WIDTH_DEVICE,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  textTitle: {
    color: PRIMARY_COLOR,
    fontSize: Normalize(16)
  },
  rowContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: {
    // textAlign: 'center',
    fontSize: Normalize(16),
    color: '#B2B2B2',
  }

});

