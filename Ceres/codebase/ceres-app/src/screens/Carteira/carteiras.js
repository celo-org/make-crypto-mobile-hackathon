//Importações Externas 
import React, { useState } from "react"; 
import {
  Avatar,
  Button, 
  Icon,
  Layout,
  Text,
  useTheme
} from '@ui-kitten/components'
import { useSelector } from 'react-redux';
import { Clipboard, Linking, Share, View } from 'react-native';  
import { TouchableNativeFeedback } from "react-native-gesture-handler";

//Importações Internas  
import { roundCelo } from '../../shared/roundNumbers';
import { showToast } from "../../shared/showToast";
import wallet_extra_data from '../../shared/walletsInfo';
import * as NavigationService from '../../navigation/NavigationService';

const copyAddress = (endereco) =>{
  showToast('Endereço copiado')
  Clipboard.setString(endereco)
}

const shareAddress = async (endereco) => {
  try {
    await Share.share({
      title: 'Endereço da sua carteira',
      message: endereco,
    });
  } catch (error) {
    
  }
};

const coinMarketCapLink = async() =>{ 
  Linking.openURL('https://coinmarketcap.com/pt-br/currencies/celo-dollar/').catch(err => {
    console.error("Couldn't load page", err)
  })
}
  
const Carteira = (props) => { 
  
  const theme = useTheme()
  
  let valor = roundCelo(props.balance, 5)
  const carteiraInterna = props.identifier == 'lovecrypto' ? true : false;

  const address = carteiraInterna ? 'Endereço não disponível' : props.address.slice(0, 10) + ' ... ' + props.address.slice(-10, props.address.length) 
  
  return(  
    <Layout style = {{width: '100%', paddingVertical: 16, paddingHorizontal: 24, marginBottom: 1, marginBottomColor: 'black',  justifyContent: 'space-between'}}> 
      <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style = {{flexDirection: 'row'}}>
          <Avatar source = {carteiraInterna ? require('../../assets/images/cryptoOptions/lovecrypto.png') : {uri: wallet_extra_data[props.identifier].avatar}}/>
          <View style = {{marginLeft: 16}}>
            <Text  category='s1' style = {{fontWeight: 'bold'}}>{props.identifier}</Text>
            <Text  category='s2' appearance = 'hint'>{`saldo: ${valor} cUSD`}</Text>
          </View>
        </View>
        <View  style = {{flexDirection: 'row'}}> 
          { !carteiraInterna &&
            <Button size = 'tiny' appearance = {'ghost'} onPress = {() => shareAddress(props.address)} style = {{borderRadius: 24}} accessoryLeft={(props) => <Icon fill = {'black'} style = {{height: 24, width: 24}} name='share'/>}></Button>
          }
          <Button size = 'tiny' appearance = {'ghost'} onPress = {() => coinMarketCapLink()} style = {{borderRadius: 24}} accessoryLeft={(props) => <Icon fill = {'black'} style = {{height: 24, width: 24}} name='info'/>}></Button> 
        </View>
      </View> 
      <View style = {{marginTop: 16}}>
        <Text category = 'p1'>Endereço</Text>
        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
          <Text category = 'p2' style = {{marginRight: 16}} >{address}</Text>
          { !carteiraInterna &&
            <TouchableNativeFeedback onPress = {() => copyAddress(props.address)}>
              <Icon fill = {'black'} style = {{height: 24, width: 24}} name='copy-outline'/>
            </TouchableNativeFeedback>
          } 
        </View>

        <Button style = {{marginTop: 16}} status = {'info'} onPress = {() => NavigationService.navigate('Addaccount', {type: 'crypto', variant: props.identifier, wallet: props.identifier})}>REALIZAR TRANSFERENCIAS</Button>
      </View>
    </Layout>   
  )
}

const Carteiras = () => {  
  
  const user = useSelector(state => state.userState);
  const [carteias, setCarteiras] = useState(user.wallets)


  return (
    <Layout style = {{paddingTop: 16, flexDirection: 'row', flexWrap: 'wrap' }}> 
      {carteias.map((item, index) =>(
        <Carteira key = {index} {...item}/>
      ))} 
    </Layout>
  );
}
 
export default Carteiras; 