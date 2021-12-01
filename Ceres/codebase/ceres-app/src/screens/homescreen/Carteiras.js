//Importações Externas 
import React, { useState } from "react"; 
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';   
import LinearGradient from 'react-native-linear-gradient';
import { TouchableNativeFeedback, View } from 'react-native'; 
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { Button, Layout, Text, Icon, Modal, Card } from '@ui-kitten/components';

//Importações Internas
import { roundCelo } from "../../shared/roundNumbers";
import wallet_extra_data from "../../shared/walletsInfo";
import { generalStyle } from '../../shared/generalStyle';
import { criarCarteira }  from "../../api/criarCarteira";
import * as NavigationService from '../../navigation/NavigationService'; 

  
const Carteira = (props) => {

  let valor = roundCelo(props.balance, 4) 
  let color = wallet_extra_data[props.identifier].color

  const config = useSelector(state => state.configState);
  const control = useSelector(state => state.controlState);
  
  return(  
    
      <TouchableNativeFeedback onPress = {()=> NavigationService.navigate('Carteiras')}>
        <LinearGradient   start={{x: 1.0, y: 0}} end={{x: 0, y: 1.0}} colors={[ color + '77', color ]} style = {{padding: 16, borderRadius: 8, marginRight: 16, width: 128 }}> 
            <View style = {{paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, maxWidth: 64, backgroundColor: 'white', textAlign: 'center'}}>
              <Text category = 'p2' style = {{fontWeight: 'bold', textAlign: 'center', color: color}}>{wallet_extra_data[props.identifier].code}</Text>
            </View> 
          <View style = {{marginTop: 24}}>
            <Text category = 'p1' status = 'control' style = {{fontWeight: 'bold'}}>{props.identifier}</Text>
            {control.userDataUpdating ?
              <ShimmerPlaceHolder autoRun={true} style = {{height: 20, width: 64, borderRadius: 4, marginTop: 4}}/> :
              config.saldoVisivel ?
              <Text category = 'h6' status = 'control' style = {{fontWeight: 'bold'}}>{valor}</Text> :
              <Text category = 'h6' status = 'control' style = {{fontWeight: 'bold'}}>*.****</Text> 
            }
          </View>
        </LinearGradient>
      </TouchableNativeFeedback>
  )
}
 
const Carteiras = () => {  

  const user = useSelector(state => state.userState);

  const [carteiras, setCarteiras] = useState(user.wallets)
  const [visible, setVisible] = useState(false); 
 
  const handleCriarCarteira = () => {
    setVisible(false) 
    criarCarteira().then(result => {
      console.log("RESULTADO CRIAR CARTEIRA  " + JSON.stringify(result))
    }).catch(error =>{
      console.log('ERROR ' + JSON.stringify(error.message))
    })
  }

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style = {{marginLeft: 16, paddingVertical: 16}} fadingEdgeLength = {100} > 
      {carteiras.map((item, index) =>(
          <Carteira key = {index} id = {`pagamentos_${item.id}`} {...item}/>
      ))} 
      <Modal
        visible={visible}
        backdropStyle={generalStyle.backdrop}
        onBackdropPress={() => setVisible(false)}>
          <Card disabled={true}>
            <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Icon fill='white' style = {{height: 24, width: 24}} name='star-outline'/>
              </Layout>  
                <Text  style = {{marginTop: 8}} category = 'p1' >Criar uma nova carteira de celo doláres?</Text>
                <Text  style = {{marginTop: 8}} category = 's1' appearance = 'hint'>{'Sua nova carteira estará disponível\npara saques e depositos'}</Text>
                <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                    <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                      Cancelar
                    </Button>
                    <Button style = {{margin: 12}} status = 'success' onPress={() => {handleCriarCarteira()}}>
                      Criar Carteira
                    </Button>
                </Layout>
              </Layout>          
          </Card>
      </Modal>
      {
        (carteiras.length < 2) &&
        <TouchableNativeFeedback onPress = {() => setVisible(true)}>
          <Layout style = {{backgroundColor: '#F6F7F9', width: 104, borderRadius: 8, marginRight: 16, borderWidth: 2, borderStyle: 'dashed', borderColor: '#979797'}}>
          </Layout>
        </TouchableNativeFeedback>
      }
    </ScrollView>
  );
}
 
export default Carteiras; 