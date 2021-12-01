//Importações Externas 
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";  
import { Avatar, Button, Card, Icon, Layout, Modal, Text, } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux'; 
import { roundCelo } from '../../shared/roundNumbers'
//Importações Internas 
import { InfoBox } from '../infoBox'; 
import { PhoneComponent } from './Phone';
import { EmailComponent } from "./Email";
import { getPixKey } from '../../api/getPixKey';
import { setPixWalletPhone, setPixWalletEmail, setPixWalletCPFCNPJ, setPixWalletRandomkey, setOriginWallet } from '../../store/actions/withdraw'
import { CPFComponent } from "./CPF";
import { RandomComponent } from "./Random";

import { generalStyle } from '../../shared/generalStyle';
import { TouchableNativeFeedback } from "react-native-gesture-handler";
//Componente para login/signup com email

const CampoDeDado = (props) =>{
 switch (props.variant) {
  case 'PHONE':
    return <PhoneComponent/> 
  case 'CPF':
    return <CPFComponent/> 
  case 'EMAIL':
    return <EmailComponent/> 
  case 'RANDOM':
    return <RandomComponent/>
   default:
     break;
 }
}

export const AddAccountBank = (props) => {
 
  const variant = props.variant;
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(true);

  const wallet = useSelector(state => state.userState.wallets);

  console.log("WALLET: " + JSON.stringify(wallet))

  const WalletOption = (props) => ( 
    <TouchableOpacity onPress={() => {dispatch(setOriginWallet(props.identifier)), setVisible(false)}}>  
      <Layout style = {styles.card}> 
        
        
        {/* <View style = {styles.avatar}>
          <Avatar source = {{uri:props.imageIcon}} style = {{height: 40, width: 40}}/>
        </View>  */}
        <Layout level = '3' style = {{padding: 16,  borderRadius: 8}}>
          <Text category = 'c2' status = 'primary' style = {{fontWeight: 'bold', textAlign: 'center'}}>{roundCelo(props.balance, 2)} cUSD</Text>
        </Layout>
        <View style = {styles.textBox}>
          <Text category = 'c2' status = 'primary' style = {{fontWeight: 'bold', textAlign: 'center'}}>{props.identifier}</Text>
        </View> 
      </Layout> 
    </TouchableOpacity>   
  )



  useEffect(() =>{
    getPixKey().then(response =>{
        response.data.map((item, index) =>{ 
            switch (item.key_type) {
                case 'PHONE':
                    dispatch(setPixWalletPhone(item.id, item.key));
                    break;
                case 'EMAIL':
                    dispatch(setPixWalletEmail(item.id, item.key));
                    break;
                case 'CPF':
                    dispatch(setPixWalletCPFCNPJ(item.id, item.key));
                    break;
                case 'RANDOM':
                    dispatch(setPixWalletRandomkey(item.id, item.key));
                    break; 
                default:
                    break;
            }
        })               
    }).catch(error =>{
        console.log('ERROR Get Pix: ' + JSON.stringify(error))
    })
  }, [])
    
  const keyValues = {
    'PHONE': {title: 'Telefone'},
    'EMAIL': {title: 'Email'},
    'CPF': {title: 'CPF'}, 
    'RANDOM': {title: 'Chave Aleatória'},  
  }
  
  return (
    <Layout style={{flex: 1, paddingHorizontal: 16, marginTop: 24}}> 
      <Modal
          visible={visible}
          backdropStyle={generalStyle.backdrop}
          // onBackdropPress={() => setVisible(false)}
          >
          <Card disabled={true}>
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Icon fill='white' style = {{height: 24, width: 24}} name='phone-outline'/>
              </View> 
                <Text  style = {{marginTop: 8}} category = 'h6'>Selecione uma carteira</Text>
                <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>Selecione a carteira de qual irá converter seu saldo</Text>
                <View style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                  {
                    wallet.map((item, index) => (
                      <WalletOption key = {index} balance = {item.balance} identifier = {item.identifier}/>
                    ))
                  }
                    {/* <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                    Editar
                    </Button> */}
                    {/* <Button style = {{margin: 12}} status = 'success' onPress={() => {setVisible(false)}}>
                    Confirmar
                    </Button> */}
                </View>
              </View>          
          </Card>
        </Modal>  
        <InfoBox title = 'Saque via PIX: ' subtitle = {keyValues[variant].title}/> 
        <Text style = {{ marginTop: 48 }}>{ 'Insira a chave PIX da conta de destino'}</Text> 
        <CampoDeDado variant = {variant}/>
        {/* <PhoneComponent/>
        <EmailComponent/> */}
    </Layout>
  );
};

const styles = StyleSheet.create({  
  section: {
    // paddingTop: 8,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  input:{
    paddingTop: 8,
  }, 
  container:{
    width: '100%'
  },
  card: { 
    width: 90,
    height: 150,
    marginRight: 16,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 24, 
    borderColor: '#ccc', 
    paddingHorizontal: 8, 
    alignItems: 'center',  
    backgroundColor: 'white',
  }, 
cardContent: {
  alignItems: 'center', 
 
},
input:{
    marginTop: 16,
},
avatar: {
  width: 40,
  height: 40,
  borderRadius: 25,
  alignItems: 'center', 
  justifyContent:'center',
},
textBox: {
  height: 100, 
  paddingTop: 8,
},
closeButton: {
  position: 'absolute',
  top: 0,
  right: 0,
}
});
