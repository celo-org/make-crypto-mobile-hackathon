//Importações Externas
import {
  Button,
  Input,
  Layout,
  Datepicker,
  Icon,
  NativeDateService,
  IndexPath,  
  Text,
  Select, 
  SelectItem,
  useTheme,
} from '@ui-kitten/components';
import * as Yup from 'yup';
import moment from 'moment';
import { Formik, Field } from "formik";
import { StyleSheet } from "react-native";
import { MomentDateService } from '@ui-kitten/moment';
import { useSelector, useDispatch } from 'react-redux';
import React, { Fragment, useContext, useState, useEffect } from "react";
import { TextInputMask } from 'react-native-masked-text'
import { MaskService } from 'react-native-masked-text'
//Importações Internas
import ErrorMessage from '../../components/errormenssage';
import { showToast } from '../../shared/showToast';
import { editProfile } from '../../api/editProfile';
// import { LocalizationContext } from '../locales';  
import { generalStyle } from '../../shared/generalStyle';
import { LoadingIndicator } from '../../shared/loadingIcon';
import { TextInput } from 'react-native-paper';

import { updateUserCPF, updateUserPhone, updateUserAddress, updateUserGender} from '../../store/actions/user'
import editProfileCPF from '../../api/editProfileCPF';
import { Toast } from '../../components/PopUp';
  
//Regras de validação
const validationSchema = Yup.object().shape({ 
  cpf: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Insira apenas os digitos, sem pontos e traços').nullable(), 
})
 
export const EditCPF = (props) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector(state => state.userState); 
  
  let CPF_ref = null; 
 
  return (
    <Layout style = {styles.container}>  
      <Formik
        enableReinitialize
        initialValues={{ 
          cpf: user.cpf, 
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          // let address = {
          //   cep: "", 
          //   city: user.address.city, 
          //   number: "", 
          //   streat: ""
          // } 

          let CPF_noMask = CPF_ref.getRawValue();
           
          editProfileCPF( CPF_noMask ).then(response =>{
            setSubmitting(false);
            showToast('CPF editado com sucesso') 
            dispatch(updateUserCPF(CPF_noMask)) 
            resetForm({ cpf: user.cpf })
            console.log('Editando perfil: ' + JSON.stringify(response))
          }).catch(error =>{
            setSubmitting(false);
            resetForm({ cpf: user.cpf })
            if(error.message == "Request failed with status code 400"){
              Toast.show({
                title: 'Tivemos um erro',
                text: `O CPF ${CPF_noMask} já está vinculado à outro usuário`,
                color: theme['color-danger-default']
              }) 
            }
            // if(error.)
            console.log('Erro enviando para api' + JSON.stringify(error))
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
          <Text category = 's1' style = {{fontWeight: 'bold', marginBottom: 24}}>
            Precisamos desse dado para confirmar sua identidade
          </Text>
          <TextInput
            label="CPF" 
            mode = "outlined"
            value={values.cpf}
            // onChangeText={handleChange('cpf')} 
            style = {generalStyle.input}
            render={props =>
              <TextInputMask
                type={'cpf'}
                {...props}
                value={values.cpf}
                onChangeText={handleChange('cpf')} 
                style = {generalStyle.inputMask}
                ref = {ref => CPF_ref = ref}
              />}
          />
          <ErrorMessage status = {'danger'} errorValue={touched.cpf && errors.cpf} /> 
          <Layout style = {{paddingTop: 48}} >
            <Button
              onPress={handleSubmit}
              status='success' 
              disabled = {isSubmitting || !isValid}
              accessoryLeft={isSubmitting ? LoadingIndicator : null}
              >{'Confirmar'}</Button>
          </Layout>
        </Fragment>
        )}
      </Formik>
    </Layout>
  );
}
 
const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 24,
      paddingBottom: 48,
      paddingHorizontal: 16,
      // minHeight: 700
    }, 
  });
    