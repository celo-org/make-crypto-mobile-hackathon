//Importações Externas
import {   
  Button,
  Layout, 
  useTheme,
} from '@ui-kitten/components';
import * as Yup from 'yup';
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

//Importações Internas 
import { Toast } from '../../components/PopUp';
import { setPin } from '../../store/actions/auth'
import { InfoBox } from '../../components/infoBox';
import { updatePinApi } from '../../api/updatePin';
import SmoothPinCodeInput from '../../components/smoothPinCodeInput';
import ErrorMessage from '../../components/errormenssage'; 
import { LoadingIndicator } from '../../shared/loadingIcon'; 
import * as NavigationService from '../../navigation/NavigationService'; 

//Regras de validação
const validationSchema = Yup.object().shape({
  pin: Yup.string().matches('[0-9]{4}', 'O código deve ter 4 digitos numérios, sem pontos e traços').typeError('Deve-se especificar um código válido').required('O campo é obrigatório'),
})


export const ChangePin = () => { 

  const dispatch = useDispatch();
  const auth = useSelector(state => state.authState);
    
  const theme  = useTheme() 
    
  const [newPin, setNewPin] = useState('')
  const [actualPin, setActualPin] = useState('')

  return ( 
    <Layout style = {styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          pin : '', 
        }} 
        onSubmit={(values, {setSubmitting, resetForm}) => {   
          //Checa se digitou o PIN atual
          if(actualPin == ''){
            setActualPin(values.pin)
            resetForm({pin: ''})
            setSubmitting(false);
          }else{
            //Checa se digitou o novo PIN
            if(newPin == ''){
              setNewPin(values.pin)
              resetForm({pin: ''})
              setSubmitting(false);
            }else{
              //Checa se o novo PIN é igual a confirmação digitada
              if(newPin == values.pin){   
                updatePinApi(actualPin, newPin).then(() => {
                  Toast.show({
                    title: 'Pin alterado com sucesso', 
                    color: theme['color-success-default']
                  }) 
                  setActualPin('')
                  setNewPin('')
                  resetForm({pin: ''})
                  setSubmitting(false);
                  NavigationService.navigate('Home')
                  }).catch(error => { 
                  Toast.show({
                    title: 'Vamos tentar novamente?', 
                    text: error.message,
                    color: theme['color-danger-default']
                  }) 
                  setActualPin('')
                  setNewPin('')
                  resetForm({pin: ''})
                  setSubmitting(false);
                  })  
              }else{
                Toast.show({
                  title: 'Vamos tentar novamente?', 
                  text: 'Sua confirmação não coincide com a nova senha',
                  color: theme['color-info-default']
                }) 
                setActualPin('')
                setNewPin('')
                resetForm({pin: ''})
                setSubmitting(false); 
              } 
          } 
          setSubmitting(false);
          dispatch(setPin(values.pin))
          resetForm({pin: auth.pin})  
          } 
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
          <InfoBox title = {actualPin == '' ? 'Deseja alterar seu PIN? Digite seu PIN atual' : newPin ==  '' ? 'Digite seu novo PIN': 'Confirme seu novo PIN'} style = {{marginBottom: 24}}/> 
          <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}> 
            <SmoothPinCodeInput password mask="﹡"
              cellSize={50}
              codeLength={4}
              value={values.pin}
              maskDelay={500}
              cellStyle = {{
                borderColor: 'rgb(228, 233, 242)',
                backgroundColor: 'rgb(247, 249, 252)',
                borderRadius: 4,
                borderWidth: 1,
                marginRight: 8,
                marginLeft: 8,  
                }}
                cellStyleFocused = {{
                  borderColor: theme['color-primary-default'],
                  borderWidth: 2,
                }} 
              onTextChange={handleChange('pin')}/>
          </View> 
          <View style = {{marginBottom: 24}}></View>
          <ErrorMessage status = {'danger'} errorValue={errors.pin}/> 
          <View style = {{paddingTop: 64}} >
            <Button
              onPress={handleSubmit}
              status='success'
              disabled={ isSubmitting || !isValid}
              accessoryLeft={isSubmitting ? LoadingIndicator : null}
            >{actualPin == '' ? 'Confirmar' : 'Alterar Pin'}</Button>
          </View> 
        </Fragment>
        )}
      </Formik>
    </Layout> 
  );
}
 
const styles = StyleSheet.create({
  container: {
    width: '100%', 
  }, 
});
    