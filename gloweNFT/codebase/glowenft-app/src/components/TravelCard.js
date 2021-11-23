import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import {PRIMARY_COLOR, PRIMARY_YELLOW, STANDARD_GREY, STANDARD_WHITE} from '../constants';
import {
  ArrowRight,
  ArrowRightDisabled,
  ChatIcon,
  CloseIcon, DocumentIcon,
  EditIcon,
  QuestionIcon,
  ShareIcon,
  TestImage
} from '../assets';
import {getUrlImage, Normalize, shareLink} from '../utils';
import {ActivityIndicator} from 'react-native-paper';
import Row from './Row';
import {Navigation} from "react-native-navigation";
import {TravelDetailScreenDef} from "../screens/travel/detail/nav-def";
import config from '../dotenv'
import _ from 'lodash'

export class TravelCard extends React.Component {

  _goToDetail = (travel) => {
    Navigation.push(this.props.componentId, TravelDetailScreenDef({isAgency: travel.isAgency, travel}))
  }

  _share = (travel) => {
    if (travel.discountDate) {
      shareLink('', `${config.webUrl}/user-trip-discussion/${travel.id || travel.travelId}`)
    } else {
      shareLink('', `${config.webUrl}/trip-discussion/${travel.id || travel.travelId}`)
    }
  }

  render() {
    const {travel, onPress, showEdit, showClose, showShare, style, showQuestion, showDocument} = this.props;

    return (
      <View style={[{marginTop: 30}, style]}>
        <TouchableOpacity onPress={() => this._goToDetail(travel)}>
          <ImageBackground style={styles.container} source={{uri: getUrlImage(travel.images)}}>
            {_.get(travel, 'creatorDetails.company_name', false) && <TouchableOpacity style={styles.socialIcon}><Image source={ChatIcon}  /></TouchableOpacity>}
            <Text style={styles.title}>{_.get(travel, 'title','').toUpperCase()}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Row justifyCenter style={{paddingTop: 10}}>
          {showDocument && <TouchableOpacity onPress={() => onPress('document')}><Image source={DocumentIcon} style={[styles.icon, {width: 30}]}/></TouchableOpacity>}
          <View style={{width: 10}}/>
          {showEdit && <TouchableOpacity onPress={() => onPress('edit')}><Image source={EditIcon} style={styles.icon}/></TouchableOpacity>}
          <View style={{width: 10}}/>
          {showClose && <TouchableOpacity onPress={() => onPress('close')}><Image source={CloseIcon} style={styles.icon}/></TouchableOpacity>}
          <View style={{width: 10}}/>
          {showShare && <TouchableOpacity onPress={() => this._share(travel)}><Image source={ShareIcon} style={styles.icon}/></TouchableOpacity>}
          <View style={{width: 10}}/>
          {showQuestion && <TouchableOpacity onPress={() => onPress('question')}><Image source={QuestionIcon} style={styles.icon}/></TouchableOpacity>}
        </Row>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    color: STANDARD_WHITE,
    fontSize: Normalize(22),
    fontWeight: '600',
    marginBottom: -8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
  icon: {
    height: 40,
    width: 40,
  },
  socialIcon: {
    position: 'absolute',
    top: 10,
    left: 10
  },

});

