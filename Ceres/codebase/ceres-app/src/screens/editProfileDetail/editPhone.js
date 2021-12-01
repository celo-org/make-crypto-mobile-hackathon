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
import editProfilePhone from '../../api/editProfilePhone';
// import { LocalizationContext } from '../locales';  
import { generalStyle } from '../../shared/generalStyle';
import { LoadingIndicator } from '../../shared/loadingIcon';
import { TextInput } from 'react-native-paper';
import { Toast } from '../../components/PopUp';
import { updateUserCPF, updateUserPhone, updateUserAddress, updateUserGender} from '../../store/actions/user'
  

//Regras de validação
const validationSchema = Yup.object().shape({ 
  phone: Yup.string().matches(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, 'Insira apenas os digitos, sem pontos e traços').nullable(), 
})
 
export const EditPhone = (props) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector(state => state.userState); 
  
  let Phone_ref = null; 
 
  return (
    <Layout style = {styles.container}>  
      <Formik
        enableReinitialize
        initialValues={{ 
          phone: user.phone, 
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          

          let Phone_noMask = Phone_ref.getRawValue();
           
          editProfilePhone( Phone_noMask ).then(respose =>{
            setSubmitting(false);
            showToast('Telefone editado com sucesso') 
            dispatch(updateUserPhone(Phone_noMask)) 
            resetForm({ phone: user.phone })
          }).catch(error =>{
            setSubmitting(false);
            resetForm({ phone: user.phone })
            // console.log('\n\n\n\n\nERROR ' + JSON.stringify(error.response.data.message))
            if(error.response.data.message == "Celular já cadastrado"){
              Toast.show({
                title: 'Tivemos um erro',
                text: `O Telefone ${Phone_noMask} já está vinculado à outro usuário`,
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
            Precisamos do seu telefone para garantir o acesso a sua conta. Para verificação de duas etapas enviamos SMS
          </Text>
          <TextInput
            label="Telefone" 
            mode = "outlined"
            value={values.phone} 
            style = {generalStyle.input}
            render={props =>
              <TextInputMask
                type={'cel-phone'}
                {...props}
                value={values.phone}
                onChangeText={handleChange('phone')} 
                style = {generalStyle.inputMask}
                ref = {ref => Phone_ref = ref}
              />}
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
    