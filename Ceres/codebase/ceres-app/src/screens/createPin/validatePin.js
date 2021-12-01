//Importações Externas
import {
  Text,  
  Input,
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
import { setPinApi } from '../../api/setPin';
import { Toast } from '../../components/PopUp';
import { setPin } from '../../store/actions/auth';
import { InfoBox } from '../../components/infoBox';
import ErrorMessage from '../../components/errormenssage'; 
import { LoadingIndicator } from '../../shared/loadingIcon';
import SmoothPinCodeInput from '../../components/smoothPinCodeInput';
import * as NavigationService from '../../navigation/NavigationService'; 

    
//Regras de validação
const validationSchema = Yup.object().shape({
  pin: Yup.string().matches('[0-9]{4}', 'Insira apenas os digitos, sem pontos e traços').typeError('Deve-se especificar um código válido').required('O campo é obrigatório'),
})

export const ValidatePin = () => { 

  const dispatch = useDispatch();
  const auth = useSelector(state => state.authState);  
  const theme  = useTheme() 

  const [newPin, setNewPin] = useState('')

  return ( 
    <Layout style = {styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          pin : '' 
        }} 
        onSubmit={(values, {setSubmitting, resetForm}) => {  
          if(newPin === ''){
            setNewPin(values.pin)
            resetForm({pin: ''})
            setSubmitting(false);
          }else{
            if(newPin === values.pin){
              setPinApi(values.pin).then(response => {
                Toast.show({
                  title: 'Pin criado com sucesso', 
                  color: theme['color-success-default']
                }) 
                  setSubmitting(false);
                  dispatch(setPin(values.pin))
                  resetForm({pin: auth.pin})
                  NavigationService.navigate('Home')
                }).catch(error => {
                Toast.show({
                  title: 'Tivemos um erro', 
                  text: error.message,
                  color: theme['color-danger-default']
                }) 
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
                setNewPin('')
                resetForm({pin: ''})
                setSubmitting(false);
              } 
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
            <InfoBox title = {newPin === '' ? 'Crie seu PIN' : 'Confirme o PIN digitado'} style = {{marginBottom: 24}}/>
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
            >{newPin === '' ? 'Criar Pin' : 'Confirmar'}</Button>
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
    