//Importações Externas
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import React, { useContext, useEffect, useState, Fragment}  from "react"; 
import { SafeAreaView, ScrollView, StyleSheet, View}  from 'react-native';
import { Button, Text, Layout, Icon, useTheme, Modal, Card, Divider } from '@ui-kitten/components';
 
//Importações Internas
import { round } from '../../shared/roundNumbers';
import { showToast } from '../../shared/showToast';
import { co } from '../../components/account'; 
import { multiplier } from '../../shared/constants';
import { ThemeContext } from '../../../theme-context';
import { generalStyle } from '../../shared/generalStyle';
import { CustomHeader } from '../../shared/customHeader';
import  ErrorMessage from '../../components/errormenssage';
import { setFiatTransference, setCryptoTransference} from '../../store/actions/withdraw'; 

import { getCotacao } from '../../api/getCotacao';

const IndicadorDeBalanco = (props) => {


  
  const state = useSelector(state => state)
  const value = props.value;
 
  // let cambio = 4.96 

  const cambio = props.cambio

  let valorEmCUSD = (value).toFixed(2)
  let valorEmReal = (value * cambio).toFixed(2) 
   
  
  return(
    <View style = {{alignItems: 'center', marginTop: 24, marginBottom: 16, backgroundColor: 'white'}}>
      <Animatable.View  animation="bounceIn" duration = {2000} style = {{width:'100%', flexDirection: 'row', backgroundColor: 'transparent'}}>  
        <Text category='h1' style = {{fontSize: 50}} status = 'info'  >{valorEmCUSD} </Text>
        <Text status = 'info' category='h3' style = {{marginTop: 20}} >{state.configState.currency }</Text>       
      </Animatable.View>
      <View style = {{flexDirection: 'row', alignItems: 'center'}}> 
        <Text category = 'h5'  >{`( R$`}</Text>      
        <Text category = 'h5'> {` ${valorEmReal})`}</Text>
      </View>
    </View>
  )
};

export default IndicadorDeBalanco;
 
const styles = StyleSheet.create({
  buttonCase:{
    width: '100%',
    padding: 4,
    padding: 50,
    paddingHorizontal: 48,
  },
  buttonAdd: {
    marginRight: 8,
    marginLeft: 8,
  },
  serrilhado: {
    width: '100%',
    height: '29px', 
    right:  0,
    bottom: '-24px',
    left: 0,
  }
});