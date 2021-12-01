//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import { StyleSheet, Image } from 'react-native';
import React, { Fragment, useState }  from "react";
import { setReferalCode } from '../store/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

//Importações Externas
import ErrorMessage from './errormenssage';
import { LoadingIndicator } from '../shared/loadingIcon';

//Regras de validação
const validationSchema = Yup.object().shape({
  code: Yup.string()
    .label('Code')
    .required('Este campo deve ser preenchido')
    .min(8, 'O código deve ter 8 dígitos')
    .max(8, 'O código deve ter 8 dígitos')
})
 
//Componente para login/signup com email
export const ReferalCode = ({navigation}) => {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.authState);

  
  const signup = async () => {
    setVisible(false)
    dispatch(setReferalCode(null))
    navigation.navigate('Signup')
  };

  const saveReferal = async (code) => {
    dispatch(setReferalCode(code))
    navigation.navigate('Signup')
  };

  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{width: '100%'}}>
      
    {
      visible ? 
      <Text category = 's1' style = {{marginVertical: 24, fontWeight: 'bold'}}>Insira seu o código de indicação que você recebeu</Text>:
      <Text category = 'h6' style = {{marginVertical: 24, fontWeight: 'bold', textAlign: 'center'}}>Tem código de indicação?</Text>
    }
      
    {
      visible &&
      <Formik
        initialValues={{
          code: auth.referedBy,
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const { code } = values;
          saveReferal(code).then( () => {
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
            placeholder='Código'
            onBlur={handleBlur('code')}
            size = 'large' 
            />
            
            <ErrorMessage status = 'hint' errorValue={touched.name && errors.name} />
            <Layout style = {{paddingTop: 32, backgroundColor: 'transparent',}} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                accessoryLeft={ isSubmitting ? LoadingIndicator : null}
                disabled={ isSubmitting || !isValid }
                style = {{marginTop: 24}}
              >Cadastro</Button>
            </Layout>
            
           
          </Fragment>
        )}
      </Formik>
      }
      { !visible &&
        <Fragment>
          <Layout style = {{alignItems: 'center'}}>
            <Image style = {{height:   160, width:  270}} source = {require ('../assets/images/friends.png')}/>
          </Layout> 
          <Layout style = {{flexDirection: 'row-reverse', marginTop: 32}}>
            <Button style = {styles.button} onPress = {() => setVisible(true)}>
              Tenho código
            </Button>
            <Button style = {styles.button} appearance = 'outline' onPress = {() => signup()}>
              Não tenho código
            </Button>
          </Layout>
        </Fragment>
      }
    </Layout>
  );
};

 
const styles = StyleSheet.create({
  buttonGroup: {
    alignItems: 'center', 
    bottom: 0,
    width: '100%',
    padding: 24,
    marginTop: 48,
    backgroundColor: 'transparent',
  },
  button: {
    margin: 8,
  }
})