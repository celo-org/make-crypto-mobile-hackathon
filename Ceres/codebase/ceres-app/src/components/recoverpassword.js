//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment }  from "react";
import auth from '@react-native-firebase/auth';
import { Button, Input, Layout, Text, Icon, useTheme } from '@ui-kitten/components';

//Importações Internas 
import { Toast } from './PopUp';
import ErrorMessage from './errormenssage';
import { LoadingIndicator } from '../shared/loadingIcon'; 
import { emailRecovery } from '../api/emailRecovery';

//Regras de validação
const validationSchema = Yup.object().shape({
    email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Insira um email registrado'),
})
 
const MailIcon = (props) => (
    <Icon {...props} name='email'/>
);
 
//Componente para login/signup com email
export const RecoverPassword = ({navigation}) => {
  
  const theme  = useTheme()

  const recover = async (email) => { 

    emailRecovery(email).then(() =>{
      Toast.show({
        title: 'Email de recuperação enviado', 
        text: `Se ouver conta com o email ${email}, receberá um link de recuperação. Confira sua caixa de entrada e spam`,
        color: theme['color-info-default']
      })
      navigation.navigate('Welcome')
    }).catch(error =>{
      Toast.show({
        title: 'Tivemos um erro', 
        text: error.message,
        color: theme['color-danger-default']
      }) 
    }) 

    // auth().sendPasswordResetEmail(email).then(() => { 
    //   Toast.show({
    //     title: 'Email de recuperação enviado', 
    //     text: `Se ouver conta com o email ${email}, receberá um link de recuperação. Confira sua caixa de entrada e spam`,
    //     color: theme['color-info-default']
    //   })
    //   navigation.navigate('Welcome')
    // }).catch(error =>{
    //   Toast.show({
    //     title: 'Tivemos um erro', 
    //     text: error.message,
    //     color: theme['color-danger-default']
    //   }) 
    // }) 
  } 

  return (
    <Layout style = {{width: '100%'}} >
      <Text style = {{marginBottom: 32, textAlign: 'center'}}>Insira seu email cadastrado</Text>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { email } = values;
          recover(email).then( () => {
            resetForm({email: ''})
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
              name='email'
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder='Email'
              autoCapitalize='none'
              accessoryRight={MailIcon}  
              onBlur={handleBlur('email')}
              caption={ () => <ErrorMessage errorValue={touched.email && errors.email}/>} 
            />
            
            <Layout style = {{  marginTop: 64,}} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                accessoryLeft={isSubmitting ? LoadingIndicator : null}
                disabled={ isSubmitting || !isValid }
                >Recuperar</Button>
            </Layout>
          </Fragment>
        )}
      </Formik>
    </Layout>
  );
};
 