// @flow

import React, {PureComponent} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import {
  HEIGHT_DEVICE,
  PRIMARY_COLOR,
  PRIMARY_LIGHT_COLOR,
  PRIMARY_YELLOW,
  STANDARD_BOTTOM_SPACE, STANDARD_GREY, STANDARD_STATUS_BAR_HEIGHT, STANDARD_WHITE, WIDTH_DEVICE,
} from '../../../constants';
import t from '../../../i18n';
import {Row, Col, DiagnosticCard, Button, AppNameLogo} from '../../../components';
import {Navigation} from 'react-native-navigation';
import moment from 'moment'
import _ from 'lodash';
import {StartQuestionnaireScreenDef} from '../../questionnaire/start/nav-def';
import {callCloseIcon, CloseIcon, ExitIcon, ProfileIcon} from '../../../assets';
import {Normalize} from '../../../utils';
import TwilioCall from '../../twilio-call/components/main';
import {TwilioCallScreenDef} from '../../twilio-call/nav-def';
import {UserDetailsScreenDef} from '../../user/user-details/nav-def';

class Drawer extends PureComponent {

  state = {
    positionLeft: new Animated.Value(-WIDTH_DEVICE)
  };

  componentDidMount = async () => {

  }

  _openDrawer = () => {
    Animated.timing(this.state.positionLeft, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }

  _closeDrawer = () => {
    Animated.timing(this.state.positionLeft, {
      toValue: -WIDTH_DEVICE,
      duration: 200,
      useNativeDriver: false
    }).start();
  }

  _goToTest = () => {
    Navigation.setStackRoot(this.props.componentId, StartQuestionnaireScreenDef())
  }

  _goToTwilio = () => {
    Navigation.push(this.props.componentId, TwilioCallScreenDef())
  }
  _goToProfile = () => {
    Navigation.push(this.props.componentId, UserDetailsScreenDef())
  }

  render() {
    const {positionLeft} = this.state
    return (
      <Animated.View style={[styles.container, {left: positionLeft}]}>

        <View style={styles.circle1}/>
        <View style={styles.circle2}/>

        <Row style={[styles.rowHeader]}>
          <TouchableOpacity onPress={this._closeDrawer} style={styles.closeButton}>
            <Image source={CloseIcon}/>
          </TouchableOpacity>
          <AppNameLogo small style={{flex: 1, justifyContent: 'center'}}/>
        </Row>

        <TouchableOpacity style={styles.row} onPress={this._goToProfile}>
          <Image source={ProfileIcon}/>
          <Text style={styles.textRow}>{t('profile')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={this._goToTwilio}>
          {/*<Image source={callCloseIcon}/>*/}
          <Text style={styles.textRow}>{t('VideoCall')}</Text>
        </TouchableOpacity>


        <Row></Row>

        <View style={styles.footer}>
          <View style={styles.footerHr}/>
          <TouchableOpacity style={styles.footerRow}>
            <Image source={ExitIcon}/>
            <Text style={styles.textRow}>{t('exit')}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_DEVICE,
    width: WIDTH_DEVICE,
    backgroundColor: '#E2F0FF',
    position: 'absolute',
    top: 0,
    overflow: 'hidden',

  },
  circle1: {
    height: 120,
    width: 120,
    backgroundColor: STANDARD_WHITE,
    borderRadius: 60,
    position: 'absolute',
    right: -60,
    bottom: HEIGHT_DEVICE / 2 - 60,
  },
  circle2: {
    height: 80,
    width: 80,
    backgroundColor: STANDARD_WHITE,
    borderRadius: 60,
    position: 'absolute',
    left: 30,
    bottom: 150,
  },
  rowHeader: {
    width: '100%',
    flex: 0,
    marginTop: STANDARD_STATUS_BAR_HEIGHT + 40,
    paddingRight: 30,
    alignItems: 'center',
    marginBottom: 50,
  },
  closeButton: {
    padding: 30,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  textRow: {
    fontSize: Normalize(18),
    color: PRIMARY_COLOR,
    marginLeft: 40
  },
  footer: {
    paddingBottom: STANDARD_BOTTOM_SPACE + 30,
  },
  footerHr: {
    height: 1,
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: 45,
  },
  footerRow: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 30
  }
});

export default Drawer;
