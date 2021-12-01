//Importações Externas
import {
  Layout,
  Text,
  useTheme,
  Modal,
  Card,
  Avatar,
  Button
} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import React, { Fragment, useState, useContext } from 'react';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Tip from '../../components/tip'
import Icon from 'react-native-vector-icons/Ionicons'; 
Icon.loadFont()
//Importações Internas
import { showErrorToast, showToast } from '../../shared/showToast';
import { TooltipInfo} from '../../shared/tooltipInfo';
import { generalStyle } from '../../shared/generalStyle';
import { addUserBalance, addUserPoints }from '../../store/actions/user';
import { simpleClickEvent, clickInfoEvent } from '../../shared/analyticsLog';
import { multiplier, minimoPontosConversivel } from '../../shared/constants';
import { convertPointsApi } from '../../api/convertPoints'
// import {LocalizationContext} from '../../locales';
import { ProgressBar } from '../../components/progressBar'; 
import { Toast } from '../../components/PopUp'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { CountUp, useCountUp  } from 'use-count-up'
// import Slider from '@react-native-community/slider';

const PointsCard = (props) => {
   
  const dispatch = useDispatch()
  const user = useSelector(state => state.userState);
  const config = useSelector(state => state.configState);
  const control = useSelector(state => state.controlState)
  const [visible, setVisible] = useState(false);
  const [requesting, setRequesting] = useState(false)
  //Quantidade de pontos equivalentes a fração não inteira da moeda selecionada
  let remainer = 0;
  remainer = minimoPontosConversivel - user.points % minimoPontosConversivel;
  
  //Chamada quando o usuário confirma a conversão
  const converterPontos = () => {
    // Toast.show({
    //   title: 'Não pudemos converter',
    //   text: `A conversão de pontos está indisponível`,
    //   color: theme['color-info-default']
    // }) 
    if(user.points < minimoPontosConversivel){ 
      Toast.show({
        title: 'Não pudemos converter',
        text: `Você deve ter pelo menos ${minimoPontosConversivel} pontos para converter em 1 ${config.currency}`,
        color: theme['color-info-default']
      }) 
      simpleClickEvent('converter pontos')
    }else{
      if(user.phoneVerified){
        //Telefone Validado
       
        if(user.emailVerified){
          //Telefone Validado e Email - Conversão Liberada 
          setVisible(true)
        }else{
          // props.navigation.navigate('ValidateEmail')
         
          Toast.show({
            title: 'Conversão indisponível',
            text: `Para realizar conversões você deve antes confirmar seu email ${user.email}`,
            color: theme['color-danger-default']
          })
        }
      }else{
        // props.navigation.navigate('ValidatePhone')
        Toast.show({
          title: 'Conversão indisponível',
          text: `Você deve verificar seu telefone para poder converter pontos`,
          color: theme['color-danger-default']
        })
      }
    
    }
 }

 const converter = async () => {
    setVisible(false)
    setRequesting(true)
    Toast.show({
      title: 'Aguarde',
      text: 'Estamos solicitando a conversão',
      color: theme['color-info-default']
    })
    convertPointsApi().then(response => {
       
      
      dispatch(addUserPoints(response.data.points))
      dispatch(addUserBalance(response.data.balance)) 
      Toast.show({
        title: 'Pontos Convertidos',
        text: `Seus pontos já estão no seu saldo`,
        color: theme['color-info-default']
      })
      setRequesting(false)
    }).catch(error => { 
      // console.log("ERROR Converter " + JSON.stringify(error.response.data))
      Toast.show({
        title: 'Tivemos um erro :(',
        text: 'Tente novamente mais tarde',
        color: theme['color-danger-default']
      })
      setRequesting(false) 
    }) 
};
 
  const theme = useTheme();
  return(
    <Fragment>
      {/* Modal de confirmação*/}
      <Modal
        visible={visible}
        backdropStyle={generalStyle.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card style = {{margin: 16}} disabled={true}>
          <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center', }}>
            <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
              <Icon color='#ffffff' size = {24} name='swap-horizontal'/> 
            </Layout>
            <Text style = {{marginTop: 8}} category = 'h6'>Converter</Text>
            <Text style = {{marginTop: 8, textAlign: 'center'}} category = 'p1' appearance = 'hint'>Tem certeza que deseja converter {minimoPontosConversivel} pontos em 1 {config.currency}?</Text>
           
            <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
              <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
              Cancelar
              </Button>
              <Button style = {{margin: 12}} status = 'success' onPress={() => converter()}>
                Converter
              </Button>
            </Layout>
          </Layout>          
        </Card>
      </Modal>
      {/* Cartão de dados */}
      <View style = {styles.card}>
        {/* Header */}
        <View style = {{borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: 'transparent'}}>
          <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style = {{flexDirection: 'row', alignItems: 'center',}}>
              <Avatar size='tiny' source={require('../../assets/images/points_icon.png')} style = {{width: 20, height: 20}}/>
              <Text category = 's1' style = {{marginLeft: 8}}>Saldo em pontos</Text>
            </View> 
            <Tip id = 'info_points_card' text = 'Seus pontos podem ser trocados por cUSD'></Tip>
          </View> 
        </View>
        {/* Fim Header */}
        {/* Conteudo */}
        <View style = {{flexDirection: 'row', width: '100%', paddingTop: 8}}> 
          <View style = {{width: '55%'}}>
            {
            
            control.userDataUpdating ?
            <ShimmerPlaceHolder autoRun={true} style = {{marginTop: 6, height: 30, width: 120, marginBottom: 6}}/>  :
            user.points < 0 ?
            <Text category='s2' style = {{fontWeight: 'bold'}}>Pontos indisponível</Text>:
            <View style = {{flexDirection: 'row'}}>
              <Text category='h3' style = {{fontWeight: 'bold'}}>{ user.points }</Text>
              <Text category='s1' style = {{marginTop: 14, marginLeft: 5}}>Pontos</Text>
            </View> 
            }
            {/* { money > 0 ? 
              <Text category='c2' style = {{marginTop: 12}}>Seus pontos já valem {money} {config.currency}</Text> :
              <Text category='c2' style = {{marginTop: 12}}>O mínimo para converter são {minimoPontosConversivel} pontos</Text>
            } */}
          
          </View>
          <View style = {{flex: 1, paddingTop: 22, }}>
            {
              user.points < minimoPontosConversivel ?
              <ProgressBar points = {user.points}/>:
              // <Fragment>
              //   <Text category='c2'  style = {{marginTop: 16}}>Faltando {remainer} pontos</Text>
              //   <Text category='c2' >para trocar por 1 {config.currency}</Text>
              // </Fragment>
               
              <Button size='tiny' appearance='outline' status = 'info' disabled = {requesting} onPress={() => converterPontos()} style = {{borderRadius: 20, top: -10 }}>Converter</Button>
            }
          </View>
        </View>
        {/* Fim Conteudo */}
      </View>
    </Fragment>

 
// // <View style={{width: '100%', flexDirection: 'column', backgroundColor: 'white', borderRadius: 10,}}> 
// //   <View style = {{padding: visible ? 16 : 8, paddingHorizontal: 24, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: 'transparent'}}>
// //     <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
// //       <View style = {{flexDirection: 'row', alignItems: 'center',}}>
// //         <Avatar size='tiny' source={require('../../assets/images/points_icon.png')}/>
// //         <Text category = 's1' style = {{marginLeft: 8}}>Saldo em pontos</Text>
// //         <Tip text = 'Seus pontos podem ser trocados por cUSD'></Tip>
// //       </View>
// //       <Button size = 'tiny' onPress = {()=> setVisible(!visible)}>x</Button>
// //     </View> 
  

// //     <View style = {{flexDirection: 'row', paddingTop: visible? 16: 0, alignItems: 'center', justifyContent: 'space-between'}}>  
// //       {control.userDataUpdating ?
// //     <ShimmerPlaceHolder autoRun={true} style = {{marginTop: 10, marginLeft: 4, height: 30, width: 130, marginBottom: 10}}/>  :
// //       user.balance == -1 ?
// //       <Text category='s1'  style={{marginTop: 16, fontWeight: 'bold', marginBottom: 16}}>
// //         Saldo Indisponível
// //       </Text>:
// //       <View style={{flexDirection: 'row', alignItems: 'center' }}>
        
// //         <Text category='h1'  style={{  fontWeight: 'bold'}}> 
// //                 {points}
// //             </Text> 
          
// //         <Text category='h6' style={{marginTop: 10,  }}> Pontos</Text> 
// //       </View>} 
// //       <View style = {{width:'40%', paddingTop: 4, position: 'absolute', bottom: 5, right: 0}}>
    
// //       </View>
// //     </View>
    
// //       <ProgressBar/> 
     
    
// //   </View>
// //   {visible &&
// // <TouchableNativeFeedback  onPress={() => converterPontos()}>
// //   <Layout level = '3' style = {{  paddingVertical: 12, paddingHorizontal: 24, width: '100%',  borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}> 
// //     <Text>Converter</Text>
// //   </Layout>
// // </TouchableNativeFeedback>
// // }
// // </View>
 
  )
};

export default PointsCard;
  
const styles = StyleSheet.create({
  card: {
    flex: 1, 
    paddingVertical: 16,
    width: '100%', 
    borderRadius: 10, 
    backgroundColor: '#ffffff', 
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between', 
  }
});