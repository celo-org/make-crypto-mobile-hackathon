// @flow

import React, {PureComponent} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
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
import {putDiagnosticTest} from '../../../api';
import {StartQuestionnaireScreenDef} from '../../questionnaire/start/nav-def';
import {DrawerIcon, heartIconBig, heartRateIconBig, lungsIconBig, o2Icon, o2IconBig} from '../../../assets';
import {Normalize} from '../../../utils';
import Drawer from './drawer';
import { Portal, Modal } from 'react-native-paper'

class HomeScreen extends PureComponent {

  state = {
    isStarted: false,
    progress: 0,
    modal: null
  };

  _drawer;

  componentDidMount = async () => {

  }

  _openInfo = () => {

  }

  _goToTest = () => {
    Navigation.setStackRoot(this.props.componentId, StartQuestionnaireScreenDef())
  }

  _openDrawer = () => {
    this._drawer._openDrawer()
  }

  _openModal = (type) => {
    switch (type) {
      case 'oxygen':
        this.setState({ modal: {
            icon: o2IconBig,
            title: t('ModalTitle1'),
            text1: t('ModalText1'),
            text2: t('ModalText2'),
            color: '#A3F2FF'
          }})
        break;
      case 'breathRate':
        this.setState({ modal: {
            icon: lungsIconBig,
            title: t('ModalTitle2'),
            text1: t('ModalText3'),
            text2: t('ModalText4'),
            color: '#D7FFF0'
          }})
        break;
      case 'pulseRate':
        this.setState({ modal: {
            icon: heartIconBig,
            title: t('ModalTitle3'),
            text1: t('ModalText5'),
            text2: t('ModalText6'),
            color: '#FBC6D7'
          }})
        break;
      case 'pulseTrace':
        this.setState({ modal: {
            icon: heartRateIconBig,
            title: t('ModalTitle4'),
            text1: t('ModalText7'),
            text2: t('ModalText8'),
            color: '#FFE2D7'
          }})
        break;
    }

  }

  _hideModal = () => {
    this.setState({modal: null})
  }

  render() {
    const { report, userDiagnostic } = this.props
    const { modal } = this.state

    let lastTestDate
    lastTestDate = moment(userDiagnostic.timestamp, 'DD-MM-YYYY HH-mm-ss').format('DD MMMM YYYY - HH:mm')
    console.log({lastTestDate})
    console.log(JSON.stringify(report))

    console.log({userDiagnostic})
    return (
      <View style={styles.container}>
        <Portal>
          <Modal visible={modal} onDismiss={this._hideModal}>
            <View style={[styles.modalContainer, {backgroundColor: _.get(modal, 'color', 'white')}]}>
              <Row noFlex alignCenter>
                <Image source={_.get(modal, 'icon', o2IconBig)}/>
                <Text style={styles.modalTitle}>{_.get(modal, 'title', '')}</Text>
              </Row>
              <Text style={styles.modalText1}>{_.get(modal, 'text1', '')}</Text>
              <Text style={styles.modalText2}>{_.get(modal, 'text2', '')}</Text>
            </View>
          </Modal>
        </Portal>

        <ScrollView>
          <Row style={styles.rowHeader}>
            <TouchableOpacity onPress={this._openDrawer} style={styles.openDrawerButton}>
              <Image source={DrawerIcon}/>
            </TouchableOpacity>
            <AppNameLogo small style={{flex: 1, justifyContent: 'center'}}/>
          </Row>
          <Row noFlex>
            <Col style={styles.colTitle}>
              <Text style={styles.title}>{t('DiagnosticResults4')}</Text>
              <Text style={styles.title}>{t('DiagnosticResults5')}</Text>
              <Text style={styles.title}>{t('DiagnosticResults6')}</Text>
            </Col>
            <Col style={styles.colRetest}>
              <TouchableOpacity onPress={this._goToTest} style={styles.retest}><Text style={styles.startTest}>{t('start test')}</Text></TouchableOpacity>
            </Col>
          </Row>

          <View style={styles.body}>
            <Row noFlex alignCenter spaceBetWeen >
              <Text style={styles.lastResults}>{t('last results')}</Text>
              <Text style={styles.lastResultsDate}>{lastTestDate}</Text>
            </Row>
            <Row style={styles.row}>
              <DiagnosticCard onPressInfo={() => this._openInfo()} type={'oxygenPercentage'} value={_.get(userDiagnostic, 'Report.oxygen.saturationLevel.value', 0)} onPressInfo={() => this._openModal('oxygen')}/>
              <View style={{width: 25}}/>
              <DiagnosticCard onPressInfo={() => this._openInfo()} type={'breathRate'} value={_.get(userDiagnostic, 'Report.respiration.value', 0)} onPressInfo={() => this._openModal('breathRate')}/>
            </Row>
            <Row style={styles.row}>
              <DiagnosticCard onPressInfo={() => this._openInfo()} type={'pulseRate'} value={_.get(userDiagnostic, 'Report.hr.meanPulseRate.value', 0)} onPressInfo={() => this._openModal('pulseRate')}/>
              <View style={{width: 25}}/>
              <DiagnosticCard onPressInfo={() => this._openInfo()} type={'pulseTrace'} value={_.get(userDiagnostic, 'FullData.TimeParameters.sdrr.value', 0)} onPressInfo={() => this._openModal('pulseTrace')}/>
            </Row>
          </View>


        </ScrollView>

        <Drawer ref={ref => this._drawer = ref} componentId={this.props.componentId}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: STANDARD_WHITE,
  },
  rowHeader: {
    width: '100%',
    flex: 0,
    marginTop: STANDARD_STATUS_BAR_HEIGHT + 25,
    paddingRight: 30,
    alignItems: 'center'
  },
  openDrawerButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  colTitle: {
    alignItems: 'flex-start',
    paddingLeft: 30,
    marginTop: 40,
    paddingBottom: 40,
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: Normalize(26),
    fontFamily: 'Silka-SemiBold'
  },
  colRetest: {
    justifyContent: 'flex-end'
  },
  retest: {
    backgroundColor: '#B5C1FF',
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 30,
    borderTopLeftRadius: 45,
  },
  startTest: {
    color: STANDARD_WHITE,
    fontSize: Normalize(16)
  },
  body: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  lastResults: {
    color: STANDARD_WHITE,
    fontFamily: 'Silka-SemiBold',
    fontSize: Normalize(16)
  },
  lastResultsDate: {
    color: STANDARD_WHITE,
    fontFamily: 'Silka-SemiBold',
    fontSize: Normalize(10)
  },


  data: {
    position: 'absolute',
    height: HEIGHT_DEVICE,
    width: WIDTH_DEVICE,
    paddingHorizontal: 20,
    paddingTop: STANDARD_STATUS_BAR_HEIGHT + 50
  },

  row: {
    flex: 0,
    marginTop: 25
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
    paddingBottom: STANDARD_BOTTOM_SPACE + 20
  },
  nextButton: {
  },

  modalContainer: {
    width: WIDTH_DEVICE - 60,
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 30,
    padding: 20,
  },
  modalTitle: {
    fontFamily: 'Silka-SemiBold',
    fontSize: Normalize(19),
    color: PRIMARY_COLOR,
    paddingLeft: 30,
    marginRight: 30,
  },
  modalText1: {
    fontSize: Normalize(14),
    color: PRIMARY_COLOR,
    marginBottom: 20,
    marginTop: 20,
  },
  modalText2: {
    fontFamily: 'Silka-SemiBold',
    fontSize: Normalize(14),
    color: PRIMARY_COLOR,
  }


});

export default HomeScreen;
