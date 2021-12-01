//Importações Externas
import {
  Text,  
  Input,
  Button,
  Layout, 
  useTheme,
} from '@ui-kitten/components' 
import * as Yup from 'yup'; 
import { Formik } from "formik" 
import { Toast } from '../../components/PopUp';
import LottieView from  "lottie-react-native";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import React, { Fragment, useState, useContext, useEffect } from "react";
import { TextInput } from 'react-native-paper';
//Importações Internas 
import { InfoBox } from '../../components/infoBox';
import ErrorMessage from '../../components/errormenssage'; 
import { editProfile } from '../../api/editProfile';
import { LocalizationContext } from '../../locales';
import { generalStyle } from '../../shared/generalStyle';
import { LoadingIndicator } from '../../shared/loadingIcon';
import { requestPhoneConfirmation } from '../../api/phoneConfirmation'; 
import { setPhoneVerified ,updateUserPhone } from '../../store/actions/user';
import { Alert } from '../../components/alert';
import { TextInputMask } from 'react-native-masked-text'
 //Regras de validação
const validationSchema = Yup.object().shape({
  code: Yup.string().matches('[0-9]{6}', 'Insira apenas os digitos, sem pontos e traços').typeError('Deve-se especificar um código válido').required('O campo é obrigatório'),
})

export const ValidatePhone = (props) => {

   //Tradução
  //  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  //  initializeAppLanguage(); 
 
  const dispatch = useDispatch();
  const user = useSelector(state => state.userState);
  const [requestSent, setRequestSent] = useState(false);
  const theme  = useTheme()

  const timeSpam = 60
  const [counter, setCounter] = useState(timeSpam); 
  const [startCounter, setStartCounter] = useState(true)

 
  
    useEffect(() => { 
      setRequestSent(false)
      if(user.phone != "" && !user.phoneVerified){
        requestPhoneConfirmation().then(() =>{
          Toast.show({
            title: 'Codigo de confirmação requisitado',
            text: 'Chegará um SMS no numero cadastrado nos próximos segundos',
            color: theme['color-info-default']
          })
          setRequestSent(true)
        }).catch(error =>{
          Toast.show({
            title: 'Tivemos um erro',
            text: 'Confira se seu telefone está inserido corretamente no seu perfil e tente novamente',
            color: theme['color-danger-default']
          })
        })
      } 
    },[user.phone]) 

  const requestNewCode = () => {
    setCounter(timeSpam) 
    setStartCounter(true) 
    requestPhoneConfirmation().then(() =>{
      Toast.show({
        title: 'Codigo de confirmação requisitado',
        text: 'Chegará um SMS no numero cadastrado nos próximos segundos',
        color: theme['color-info-default']
      })
    }).catch(error =>{
      Toast.show({
        title: 'Tivemos um erro',
        text: 'Confira se seu telefone está inserido corretamente no seu perfil e tente novamente',
        color: theme['color-danger-default']
      })
    })
  }

  setTimeout(() =>  {
    if(startCounter && counter > 0){
      setCounter(counter - 1)
    } 
  }, 1000) 

  return ( 
    <Layout style = {styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
            code : null
        }}
        
        onSubmit={(values, {setSubmitting, resetForm}) => {   
          setSubmitting(false);
          requestPhoneConfirmation(values.code).then(response =>{
            // console.log('Resposta confirmação - ' + JSON.stringify(response))
            dispatch(setPhoneVerified())
            
            Toast.show({
              title: 'Telefone Validado',
              text: 'Agora você tem acesso a mais funções dentro do APP',
              color: theme['color-success-default']
            })
            props.navigation.navigate('Home')
            
          }).catch(error =>{ 
              resetForm({code: null})
              switch (error.response.status) {
                case 400: 
                  Toast.show({
                    title: 'Código inválido',
                    text: 'Verifique o código recebido via SMS e tente novamente',
                    color: theme['color-danger-default']
                  })
                  break; 
                default:
                  Toast.show({
                    title: 'Tivemos um erro',
                    text: 'Se o erro persistir, entre em contato com nosso suporte',
                    color: theme['color-danger-default']
                  })
                  break;
              } 
            })   
            
           
          }}
            validationSchema={validationSchema}>
        {({
        handleChange, 
        values,
        handleSubmit,
        errors,
        isValid,
        touched,
        handleBlur,
        isSubmitting
      }) => (
        <Fragment>
          { user.phone == "" ?
          <Fragment>
            <InfoBox title = 'Sem telefone cadastrado'/>
            <Text category = 's1' style = {{textAlign: 'center', marginTop: 40 , marginBottom: 16}}>Antes, visite seu perfil e adicione um número de telefone</Text>  
            <LottieView
                source={require("../../assets/animations/profileFind.json")}
                loop
                autoPlay
                style = {{width: '100%', top: -30, marginBottom: -100  }} 
                />
            <Layout style = {{paddingTop: 20}} >
              <Button
                onPress={() =>props.navigation.navigate('Detail')}
                status='success'  
              >Editar Perfil</Button>
              </Layout>
            {/* <Input
              name='phone'
              value={values.phone}
              autoCapitalize='none'
              onBlur={handleBlur('phone')}
              style = {generalStyle.input}
              onChangeText={handleChange('phone')}
              label= {translations['editProfile.phone']}
              placeholder={translations['editProfile.phone']} 
              caption={'Insira seu telefone'}
              />  
              <ErrorMessage status = {'danger'} errorValue={touched.phone && errors.phone} /> */}
              
            </Fragment> : 
            user.phoneVerified? 
            <Fragment>
              <Text>Telefone Validado</Text>
            </Fragment>:
            <Fragment>  
              <InfoBox title = 'Confirmando telefone: ' subtitle = {user.phone}/>
              <View style = {{marginTop: 24, marginBottom: 24}}>
                <Text category = 's1' style = {{textAlign: 'center', marginTop: 16, marginBottom: 16}}>{requestSent ? 'Enviamos um código de confirmação via SMS' : 'Estamos enviando código de confirmação'}</Text>  
                <Fragment>
                  <TextInput
                    name='code'
                    mode = {'outlined'}
                    value={values.code}
                    autoCapitalize='none'
                    onBlur={handleBlur('code')}
                    // style = {[generalStyle.input]}
                    onChangeText={handleChange('code')}
                    label= {'Código de verificação'}
                    keyboardType = {'phone-pad'}
                    // placeholder={'Código de Confirmação'} 
                    render={props =>
                      <TextInputMask
                        {...props}
                        type={'custom'}
                        options={{ mask: '999999'}}
                      />} 
                    />
                    <ErrorMessage status = {'danger'} errorValue={touched.code && errors.code} />
                </Fragment> 
              </View> 
             
                <Button appearance = 'ghost' disabled={ counter > 0}  onPress = {requestNewCode}>
                  {`Solicitar novo código ${counter > 0 ? '(' + counter + ')': ''}`}
                </Button> 
                <Layout style = {{paddingTop: 48}} >
              <Button
                onPress={handleSubmit}
                status='success'
                disabled={ isSubmitting || !isValid }
                accessoryLeft={isSubmitting ? LoadingIndicator : null}
              >Validar Telefone</Button>
            </Layout>
            </Fragment>
          }
             
         
          
        </Fragment>
        )}
      </Formik>
    </Layout> 
  );
}
 
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
  }, 
});
    