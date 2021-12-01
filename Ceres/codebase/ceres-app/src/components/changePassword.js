import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment }  from "react";
import { Button, Icon, Input, Text, Layout } from '@ui-kitten/components';
import { StyleSheet, TouchableWithoutFeedback} from "react-native";

import ErrorMessage from './errormenssage';
import auth from '@react-native-firebase/auth';
import { showToast } from '../shared/showToast';
import { LoadingIndicator } from '../shared/loadingIcon'

//Regras de validação
const validationSchema = Yup.object().shape({
  password: Yup.string()
  .label('Password')
  .required('Este campo é obrigatório')
  .min(6, 'A senha deve ter pelo menos 6 caracteres')
  .max(10, 'A senha deve ter no máximo 10 caracteres'),
confirmPassword: Yup.string()
  .oneOf([Yup.ref('password')], 'A confirmação deve coincidir com a senha')
  .required('A confirmação é obrigatória')
})
  
//Componente para login/signup com email
export const ChangePassword = props  => {
   
  const updatePassword = async (password) => {
    auth().currentUser.updatePassword(email).then( () => {
      showToast('senha alterada com sucesso');
    }).catch(function(error) {
      console.log(error)
    });
    showToast('senha alterada com sucesso');
  };

  //Hide text do password
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const togglePasswordSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={togglePasswordSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );
 
  //Hide text do confirm password
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = React.useState(true);

  const toggleConfirmSecureEntry = () => {
    setSecureConfirmTextEntry(!secureConfirmTextEntry);
  };
 
  const renderConfirmIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleConfirmSecureEntry}>
      <Icon {...props} name={secureConfirmTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );


  return (
    <Layout style={{width: '100%'}}>
      
      <Formik
        initialValues={{
          password: '',
          confirmPassword: ''
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { password, confirmPassword } = values;
          updatePassword(password).then( () => {
            resetForm({password: '', confirmPassword: ''})
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
              name='password'
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder='Senha'
              accessoryRight={renderPasswordIcon}
              secureTextEntry={secureTextEntry}
              onBlur={handleBlur('password')}
              caption={ () => <ErrorMessage errorValue={touched.password && errors.password}

              />} 
              style = {styles.input}
            />
            <Input
              name='password'
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              placeholder='Confirmação de senha'
              accessoryRight={renderConfirmIcon}
              secureTextEntry={secureConfirmTextEntry}
              onBlur={handleBlur('confirmPassword')}
              caption={ () => <ErrorMessage  errorValue={touched.confirmPassword && errors.confirmPassword}
               />} 
               style = {styles.input}
            />
            <Layout style = {styles.buttonRow} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                accessoryLeft={ isSubmitting && LoadingIndicator }
                disabled={ isSubmitting || !isValid }
                >Recuperar</Button>
            </Layout>
          </Fragment>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({  
  input:{
    marginTop: 16,
  },
  buttonRow:{
    marginTop: 48,
  },
});
