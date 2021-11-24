import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Row from './Row';
import Col from './Col';
import {Text} from 'react-native-paper';
import {
  JTENERGY, JTENERGY_BOLD,
  JTENERGY_SEMI_BOLD,
  PRIMARY_COLOR,
  STANDARD_GREY,
  STANDARD_TEXT_GREEN,
  STANDARD_TEXT_GREY,
  STANDARD_WHITE,
  WIDTH_DEVICE,
} from '../constants';
import {Normalize} from '../utils';
import moment from 'moment';
import t from '../i18n';
import {BoxShadow} from 'react-native-shadow';
import {GradientBackground} from './GradientBackground';

const shadowOpt = {
  width: WIDTH_DEVICE - Normalize(20),
  height: 100,
  color: '#F2B940',
  // color: "#FFFFFF",
  border: Normalize(13),
  radius: Normalize(13),
  opacity: 0.5,
  x: 0,
  y: 0,
  style: {
    marginBottom: Normalize(25),
  }
}

export class Notification extends React.Component {

  _getTextAmount = (notification) => {
    const origQty = Number(notification.origQty).toFixed(2)
    const executedQty = Number(notification.executedQty).toFixed(2)
    return `${executedQty}/${origQty}`
  }
  _getTextPrice = (notification) => {
    const price = Number(notification.price).toFixed(2)
    return `${price}`
  }
  _getTextType = (notification) => {
    const side = this._capitalizeFirstLetter(notification.side.toLowerCase())
    const type = this._capitalizeFirstLetter(notification.type.toLowerCase())
    return `${side} ${type}`
  }
  _capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  render() {
    const { notification } = this.props;

    const amount = this._getTextAmount(notification)
    const price = this._getTextPrice(notification)
    const type = this._getTextType(notification)
    const isBuy = notification.side !== "SELL"
    return (
      <BoxShadow setting={shadowOpt}>
        <Row style={styles.container}>
          <Col style={styles.colType}>
            <Text style={[styles.textType, isBuy && {color: STANDARD_TEXT_GREEN}]}>{type}</Text>
          </Col>
          <Col style={styles.colQuantity}>
            <Text style={styles.textSymbol}>{notification.symbol}</Text>
            <Row spaceBetween>
              <Text style={styles.textLabel}>{t('amount')}</Text>
              <Text style={styles.textValue}>{amount}</Text>
            </Row>
            <Row spaceBetween>
              <Text style={styles.textLabel}>{t('price')}</Text>
              <Text style={styles.textValue}>{price}</Text>
            </Row>

          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Text style={styles.textDate}>{moment(notification.updateTime).format('DD-MM-YYYY HH:mm')}</Text>
            {/*<TouchableOpacity style={styles.cancelButton}/>*/}
          </Col>
        </Row>
      </BoxShadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH_DEVICE - Normalize(20),
    borderRadius: Normalize(10),
    padding: Normalize(5),
    paddingVertical: Normalize(10),
    backgroundColor: '#1D1D1D',
  },
  colType: {
    width: '25%',
    flex: 0,
    alignItems: 'flex-start',
  },
  textType: {
    color: 'red',
    fontWeight: '600',
    fontSize: Normalize(14),
    // marginTop: -Normalize(4)

  },
  colQuantity: {
    alignItems: 'flex-start',
    marginLeft: Normalize(5)
  },
  textSymbol: {
    color: STANDARD_WHITE,
    fontWeight: '600',
    fontSize: Normalize(14),
    marginBottom: Normalize(5),
  },
  textLabel: {
    width: '50%',
    color: STANDARD_TEXT_GREY,
  },
  textValue: {
    color: STANDARD_WHITE,
  },
  textDate: {
    color: STANDARD_TEXT_GREY,
    fontWeight: '600',
    fontSize: Normalize(10)
  },
  cancelButton: {

  }

});

export default Notification
