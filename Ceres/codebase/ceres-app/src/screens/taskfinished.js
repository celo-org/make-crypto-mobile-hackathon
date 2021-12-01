//Importações Externas
// import Counter from 'react-native-counter';
import LottieView from  "lottie-react-native";
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect, useState, Fragment } from "react";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { Layout, Button, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, ImageBackground, View, SafeAreaView, BackHandler, } from "react-native"; 

//Importações Internas
import { Toast } from '../components/PopUp';
import { InfoBox } from "../components/infoBox"; 
import { sendTaskApi } from '../api/sendTaskApi';
import { multiplier } from "../shared/constants";
import { taskEvent } from '../shared/analyticsLog';
import { updateFeed, updateUserData, updateTasksFeed}from '../store/actions/control';
import { addUserBalance, addUserPoints }from '../store/actions/user';

export const TaskFinishedScreen =  (props) => {  

  const theme = useTheme();
  const dispatch = useDispatch() 
  const [answers, setAnswers] = useState(props.route.params.answers) 
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(props.route.params.id)
  const [ points, setPoints ] = useState(props.route.params.points)
  const [ reward, setReward ] = useState(props.route.params.reward)
  const [ urlImage, setUrlImage ] = useState(props.route.params.urlImage)
  const [ sentAnswers, setSentAnswers, ] = useState(false);
  const instant_payment = props.route.params.instant_payment; 
  const [hasError, setHasError] = useState(false)
  
  const goHome = () =>{ 
    dispatch(updateUserData())  
    dispatch(updateTasksFeed())  
    props.navigation.navigate('Home')
  }

  const sendAwnsers = async (id, answers) =>{  
    sendTaskApi(id, answers).then(response => {
      //Atualizado pela api
      const balanceUpdated = response.data.balance 
      const pointsUpdated = response.data.points;
      
      //Salva o retorno na memória
      if(instant_payment){
        dispatch(addUserPoints(pointsUpdated)) 
        dispatch(addUserBalance(balanceUpdated))  
      } 
      //Informa Analitics
      taskEvent('taskFinished')  
      setLoading(false) 
    }).catch(error => {
     
      setHasError(true)
      setLoading(false)
      Toast.show({
        title: 'Tivemos um erro',
        text: `Tente novamente mais tarde, se o erro persistir, entre em contato com o suporte`,
        color:  theme['color-danger-default'] 
      })
    }) 
    //Confirmação que deu certo
    setSentAnswers(true)
  }
   
  useEffect(() => { 
    //Reiniciando
    setLoading(true)
    setHasError(false)
    setSentAnswers(false)
 
    sendAwnsers(id, answers)  

    // BackHandler.addEventListener('hardwareBackPress', () => { 
    //   Toast.show({
    //     title: 'Não é possivel voltar',
    //     text:  'Não é possivel editar suas respostas',
    //     color:  theme['color-info-default'] 
    //   })   
    //   // return true
    // });

    // return () => BackHandler.addEventListener('hardwareBackPress', () => { return false });

    // props.navigation.addListener('hardwareBackPress', (e) => {       
    //   // Evita voltar
    //   if (hasError || !loading) {
    //     // If we don't have unsaved changes, then we don't need to do anything
    //     return;
    //   }else{
    //     e.preventDefault();  
    //     Toast.show({
    //       title: 'Não é possivel voltar',
    //       text: 'Respostas enviadas, não é possivel mais editá-las',
    //       color:  theme['color-info-default'] 
    //     })  
    //   }
    // })   
  }, [props.navigation]); 

  return ( 
    <SafeAreaView
    style={{
    flex: 1,
    backgroundColor:  '#FFFFFF',
    }}>
      <Layout style = {{backgroundColor:  theme['color-primary-default'] ,  paddingVertical: 24, paddingHorizontal: 16, justifyContent: 'flex-end'}}>
        <Text category = 'h4' style = {{ textAlign: 'center', fontWeight: 'bold' }}  status = 'control'>Obrigado por</Text>
        <Text category = 'h4' style = {{ textAlign: 'center',  fontWeight: 'bold' }}  status = 'control'>suas respostas!!</Text> 
      </Layout>  
      {!loading && !hasError &&
        <LottieView
        source={require("../assets/animations/confete.json")}
        loop
        autoPlay
        style = {{width: '100%', top: 30, position: 'absolute', zIndex: 10 }} 
        /> 
      }
      <ImageBackground blurRadius={0.4} source={ urlImage == null ? require('../assets/images/awnsered.png') : { uri: urlImage }} style={ styles.background }/> 
        <ScrollView style = {{flex: 1, width: '100%'}}>
          <Animatable.View animation="bounce"  style = {{ width: '100%', backgroundColor: 'transparent', alignItems: 'center', paddingBottom: 24 }}>  
            {loading?
              <View style = {{ alignItems: 'center'}}> 
                <ShimmerPlaceHolder autoRun={true} style = {styles.mainAnimation}/> 
                <View style = {{marginTop: 32}}> 
                  <View style = {{justifyContent: 'center', alignItems: 'center'}}> 
                    <ShimmerPlaceHolder autoRun={true} style = {{width: 280, height: 25, marginBottom: 6}}/>  
                    <ShimmerPlaceHolder autoRun={true} style = {{width: 280, height: 25, marginTop: 32}}/>  
                    <ShimmerPlaceHolder autoRun={true} style = {{width: 280, height: 25, marginTop: 32}}/> 
                  </View>
                </View>
              </View>:
              <View style = {{ alignItems: 'center'}}>
                <LottieView
                source={hasError? require("../assets/animations/errorTask.json") : require("../assets/animations/success.json")}
                loop
                autoPlay
                style = {styles.noMoreTasks} 
                />
                <View style = {{marginTop: 32}}> 
                  {hasError ? 
                  <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    <Text category = 'h5' status = 'danger' style = {{fontWeight: 'bold'}}>Respostas não enviadas</Text> 
                    <Text category = 's1' status = 'basic' style = {{textAlign: 'center', marginTop: 32}}>Tivemos um erro ao enviar suas respostas</Text>
                    <Text category = 's2' status = 'basic' style = {{textAlign: 'center', marginTop: 32}}>Aperte "Continuar" para voltar a tela pricipal</Text>
                  </View>:
                  <Fragment>     
                      {instant_payment ? 
                      <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                        <Text category = 'h5' status = 'info' style = {{fontWeight: 'bold'}}>Total ganho</Text>
                        <Text  category = 'h1' status = 'success' style = {{marginTop: 24, fontWeight: 'bold'}}>{points == 0 ? `${parseFloat( reward / multiplier).toFixed(2)} cUSD` : `${points} pontos`}</Text>
                        <Text category = 's1' status = 'basic' style = {{textAlign: 'center', marginTop: 32}}>{'Sua recompensa já foi adicionada\na sua carteira'}</Text> 
                      </View> :
                      <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                        <Text category = 'h5' status = 'info' style = {{fontWeight: 'bold'}}>Iremos verificar suas respostas</Text>
                        <Text category = 'h6' status = 'basic' style = {{textAlign: 'center', marginTop: 32}}>{`Após a verificação depositaremos \nseus ${points == 0 ? 'cUSD' : 'pontos'}`}</Text>
                        <InfoBox title = {'Total de pontos ganhos'} subtitle = {`${points} pontos`} status = {'success'} style = {{marginTop: 24}}/> 
                      </View>}
                  </Fragment>} 
              </View> 
            </View>} 
            <Layout style = { styles.buttonRow }>
              {sentAnswers ? 
                <Button onPress = {() => goHome() } appearance = 'outline' status = 'info'>Continuar</Button>:
                <Text status = 'info'>Estamos enviando suas respostas</Text> 
              }
            </Layout>
          </Animatable.View > 
        </ScrollView> 
    </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({  
  noMoreTasks: {
    marginVertical: 24,
    width: 126,
    height: 180,
  }, 
  mainAnimation: {
    height: 140,
    width: 140,
    borderRadius: 90,
    marginBottom: 24,
    marginTop: 64,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    // minHeight: 720,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.15,
    backgroundColor: '#F8F8FF',
     
    // filter: 'grey', 
    
    resizeMode: 'stretch',
    position: 'absolute',
  zIndex: -3,
  },
  containerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'transparent'
    },
  buttonRow:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    marginVertical: 48,
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'transparent'
    },
  overlay:{
    // position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
});