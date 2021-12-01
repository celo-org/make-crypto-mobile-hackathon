//Importações Externas
import {
  Icon,
  Text, 
  useTheme, 
} from '@ui-kitten/components'; 
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, useContext } from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

//Importações Internas
import { round } from '../../shared/roundNumbers' 
// import {LocalizationContext} from '../../locales'; 
import { multiplier } from '../../shared/constants'; 
import { getUserBalance } from '../../api/getUserBalance';
import { updateUserDataFinished }from '../../store/actions/control';
import { addUserBalance, addUserPoints }from '../../store/actions/user'; 
 
import BalanceActionsButton from './balanceActionsButton';
const Balance = (props) => {
 
  const user = useSelector(state => state.userState);
  const config = useSelector(state => state.configState);
  const theme = useTheme();
  var saldo = round(user.balance / multiplier, 2).toFixed(2)
  const [ visible, setVisible ] = useState(true);
   
  const control = useSelector(state => state.controlState)
  const dispatch = useDispatch()
  // const { translations } = useContext(LocalizationContext);
  

  useEffect(() => { 
    getUserBalance().then(response =>{ 
      
      let points = response.data.points;
      let balance = response.data.balance;

      if(balance < 0 || balance == 'undefined' || balance == null){
        dispatch(addUserBalance(-1))
      }else{
        dispatch(addUserBalance( response.data.balance))
      } 
      if(points < 0 ||  points == 'undefined' || points == null){
        dispatch(addUserPoints(-1))
      }else{
        dispatch(addUserPoints(response.data.points))
      } 
      dispatch(updateUserDataFinished())
    }).catch(error =>{
      Toast.show({
        title: 'Tivemos um erro',
        text: 'Tivemos um erro ao buscar seu saldo',
        color: theme['color-danger-default']
      })
    })
 
}, [control.userDataUpdating]);

  const RenderEyeIcon = () => (
    <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
      <Icon fill = 'white' style = {{height: 24, width: 24, marginLeft: 8, marginTop: -2, marginRight: 0}} name={visible ? 'eye' : 'eye-off'}/>
    </TouchableWithoutFeedback>
  ); 

  return( 
    <View style={{ display: 'flex', alignItems: 'center',}}>
      {/* Seu saldo */}
      <View style={{flexDirection: 'row' }}>
        <Text category='label' appearance='alternative' style = {{marginLeft: 30}}>{'Seu saldo'}</Text>
        <RenderEyeIcon/>
      </View>
      {/* Fim seu dado */}
      {/* Saldo */}
      {control.userDataUpdating ?
      <ShimmerPlaceHolder autoRun={true} style = {{marginTop: 18, marginLeft: 4,height: 36, width: 130, marginBottom: 8}}/>  :
      user.balance == -1 ?
      <Text category='s1' appearance='alternative' style={{marginTop: 16, fontWeight: 'bold', marginBottom: 16}}>
        Saldo Indisponível
      </Text> :
      <View style={{flexDirection: 'row' }}>
        {
          visible ?
          <Text category='h1' appearance='alternative' style={{marginTop: 8,  fontWeight: 'bold'}}>{ saldo }</Text> :
          <Text category='h1' appearance='alternative' style={{marginTop: 8, marginLeft: 18, marginRight: 16, fontWeight: 'bold'}}>-.--</Text>
        }
        <Text category='h6' appearance='alternative' style={{marginTop: 26,}}> { config.currency }</Text>
      </View>} 
      {/* Fim do saldo */}
      {/* Ações do saldo */}
      <View style = {{ flexDirection: 'row', justifyContent: 'center', marginTop: 16}}> 
        <BalanceActionsButton navigation = {props.navigation} id = 'sacar' title = {'Sacar'} icon = {'arrow-up-outline'} url = {'Withdraw'} status = {1}/>
        <BalanceActionsButton navigation = {props.navigation} id = 'extrato' title = {'Extrato'} icon = {'receipt-outline'} url = {'Extrato'} status = {2}/>
        <BalanceActionsButton navigation = {props.navigation} id = 'receber' title = {'Receber'} icon = {'arrow-down-outline'} url = {'ValidateEmail'} status = {3}/> 
      </View>
      {/* Fim ações do saldo */}
    </View>
  )
};

export default Balance;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  balance: {

  }

  });