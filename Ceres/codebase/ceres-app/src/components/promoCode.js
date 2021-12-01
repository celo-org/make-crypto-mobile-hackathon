//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment }  from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Layout } from '@ui-kitten/components';

//Importações Internas
import ErrorMessage from './errormenssage';  
import { showToast } from '../shared/showToast';
import { validateCodeApi } from '../api/validateCode';
import { LoadingIndicator } from '../shared/loadingIcon'

//Regras de validação
const validationSchema = Yup.object().shape({
  code: Yup.string()
  .label('Code')
  .required('Este campo é obrigatório')
  .min(6, 'O código deve ter pelo menos 6 caracteres')
  .max(50, 'O código deve ter no máximo 50 caracteres')  
})

//Componente para login/signup com email
export const PromoCode = () => { 
  //Tradução
  // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  // initializeAppLanguage(); 

  const setCode = async (code) => { 
    try{
      let response = await validateCodeApi(code) 
      showToast(response.datamessage) 
    }catch(error){
      showToast(error.response.data.message)
    }  
  };
 
  return (
    <Layout style={{width: '100%'}}>
      <Formik
        initialValues={{
          code: '',
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { code } = values;
          setCode(code).then( () => {
            resetForm({code: ''})
            setSubmitting(false);
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
            <Input
              name='code'
              value={values.code}
              onChangeText={handleChange('code')}
              placeholder= {'Código promocional'} 
              onBlur={handleBlur('code')}
              caption={ () => <ErrorMessage errorValue={touched.password && errors.password} 
              />} 
              style = {styles.input}
            /> 
            <Layout style = {styles.buttonRow} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                accessoryLeft={ isSubmitting && LoadingIndicator }
                disabled={ isSubmitting || !isValid }
                >{'Confirmar'}</Button>
            </Layout>
          </Fragment>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({  
  input:{
    marginTop: 48,
  },
  buttonRow:{
    marginTop: 48,
  },
});
