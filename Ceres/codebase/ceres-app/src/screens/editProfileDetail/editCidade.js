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
  

//Regras de validação
const validationSchema = Yup.object().shape({ 
  phone: Yup.string().matches(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, 'Insira apenas os digitos, sem pontos e traços').nullable(), 
})
 
export const EditCidade = (props) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector(state => state.userState); 
  
  let Phone_ref = null; 
 
  return (
    <Layout style = {styles.container}>  
      <Formik
        enableReinitialize
        initialValues={{ 
          city: user.address.city, 
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          let address = {
            cep: "", 
            city: values.city, 
            number: "", 
            streat: ""
          } 

          // let Phone_noMask = Phone_ref.getRawValue();
           
          editProfile(user.name, [], user.phone, '', null, user.cpf, address).then(respose =>{
            setSubmitting(false);
            showToast('Cidade editada com sucesso') 
            dispatch(updateUserAddress(address)) 
            resetForm({ city: user.address.city })
          }).catch(error =>{
            console.log(error.message)
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
            A sua localização é usada para selecionar as melhores tarefas para você
          </Text>
          <TextInput
            label="Cidade" 
            mode = "outlined"
            value={values.city} 
            style = {generalStyle.input}
            onChangeText={handleChange('city')} 
            // render={props =>
            //   <TextInputMask
            //     type={'cel-phone'}
            //     {...props}
            //     value={values.phone}
            //     onChangeText={handleChange('phone')} 
            //     style = {generalStyle.inputMask}
            //     ref = {ref => Phone_ref = ref}
            //   />}
          />
          <ErrorMessage status = {'danger'} errorValue={touched.phone && errors.phone} /> 
          <Layout style = {{paddingTop: 48}} >
            <Button
              onPress={handleSubmit}
              status='success' 
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
    