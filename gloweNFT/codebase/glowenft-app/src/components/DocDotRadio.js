import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox as PaperCheckbox} from "react-native-paper";
import {PRIMARY_COLOR, PRIMARY_YELLOW, STANDARD_WHITE} from '../constants';
import {Normalize} from '../utils';
import Row from './Row';
import t from '../i18n';

export class DocDotRadio extends React.Component {


  _renderRadio = (selected, index) => {
    const isSelected = selected === index
    return (
      <TouchableOpacity onPress={() => this.props.onPress(index)}>
        <View style={[styles.circle, !isSelected && {borderColor: STANDARD_WHITE}]}>
          {isSelected &&
          <View style={styles.centerCircle}/>
          }
        </View>
      </TouchableOpacity>
    )
  }



  render() {
    const { answer } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.textName}>{t(answer.name)}</Text>
        <Row style={styles.rowValue}>
          <Text style={styles.textValue}>{t('in no way')}</Text>
          <Text style={styles.textValue}>{t('enough')}</Text>
          <Text style={styles.textValue}>{t('very much')}</Text>
        </Row>
        <Row style={styles.rowRadios}>
          {this._renderRadio(answer.answer, 0)}
          <View style={styles.line}/>
          {this._renderRadio(answer.answer, 1)}
          <View style={styles.line}/>
          {this._renderRadio(answer.answer, 2)}
          <View style={styles.line}/>
          {this._renderRadio(answer.answer, 3)}
          <View style={styles.line}/>
          {this._renderRadio(answer.answer, 4)}
        </Row>

      </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 40,
  },
  textName: {
    fontSize: Normalize(14),
    color: PRIMARY_COLOR,
    marginBottom: 20,
  },
  rowValue: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 15
  },
  textValue: {
    color: '#FA9D72',
  },
  circle: {
    borderWidth: 4,
    borderColor: PRIMARY_COLOR,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: STANDARD_WHITE
  },
  centerCircle: {
    height: 13,
    width: 13,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: STANDARD_WHITE
  },
  rowRadios: {
    alignItems: 'center',
    paddingHorizontal: 20,
  }

});

export default DocDotRadio
