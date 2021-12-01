//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import React, { Fragment }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { Button, Input, Layout, Icon, Text} from '@ui-kitten/components';
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

//Importações Internas
import ErrorMessage from '../../errormenssage';
import { loginApi }  from '../../../api/login';
import { setUser, setUserPhoto } from '../../../store/actions/user';
import { LoadingIndicator } from '../../../shared/loadingIcon';
import { loginStart, loginFailure, loginSuccess, } from '../../../store/actions/auth';

//Regras de validação
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Insira um email registrado'),
  password: Yup.string()
    .label('Password')
    .required('Este campo é obrigatório')
    .min(6, 'A senha deve ter pelo 6 caracteres ')
    .max(10, 'A senha deve ter no máximo 10 caracteres'),
})
 
//Componente para login/signup com email
export const Login = (props) => {

  const dispatch = useDispatch();

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

  const MailIcon = (props) => (
    <Icon {...props} name='email'/>
  );
  const authState = useSelector(state => state.authState);
  
  const login = async (email, password) => {
    dispatch(loginStart('EMAIL')) 
    auth()
    .signInWithEmailAndPassword(email, password)
    .then( async data => {

      // alert('DATA ' + JSON.stringify(data))
      loginApi().then(response =>{
        const userAPI = response.data.user_data;
        // alert('USER1 ' + JSON.stringify(userAPI))
        console.log('USER API: ' + JSON.stringify(userAPI))
        dispatch(loginSuccess())
        // alert("USER API " + JSON.stringify(userAPI))
        dispatch(setUser(userAPI))
        dispatch(setUserPhoto(auth().currentUser.photoURL))
      }).catch(error =>{
        console.log('Login api error: ' + JSON.stringify(error.response))
        dispatch(loginFailure(error.message)) 
      })
      // try{ 
      //   const response = await loginApi().then(response =>{

      //   })
      //   // alert('USER1 ' + JSON.stringify(response))
      //   const userAPI = response.data.user_data;
      //   alert('USER1 ' + JSON.stringify(userAPI))
       
      //   dispatch(loginSuccess())
      //   dispatch(setUser(userAPI))
      //   dispatch(setUserPhoto(auth().currentUser.photoURL))
      // }catch ( error ) {
      //   console.log('Login api error: ' + error.message)
      //   dispatch(loginFailure(error.message)) 
      // }
    })
    .catch(error => { 
      console.log('Login firebase error: ' + error.message)
      dispatch(loginFailure(error.message))
      
    }); 
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        const { email, password } = values;
        login(email, password).then( () => {
          resetForm({ email: '', password: ''})
        })
        setSubmitting(false);
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
        <Fragment  >
          <Input
            name='email'
            value={values.email}
            onChangeText={handleChange('email')}
            placeholder='Email'
            autoCapitalize='none'
            onBlur={handleBlur('email')}
            accessoryRight ={ MailIcon} 
            caption = { () =>  <ErrorMessage errorValue={ touched.email && errors.email}/>}
            style = {styles.input}
          />
          <Input
            name='password'
            value={values.password}
            onChangeText={handleChange('password')}
            placeholder='Senha'
            onBlur={handleBlur('password')}
            accessoryRight={renderPasswordIcon}
            secureTextEntry={secureTextEntry}
            caption={() => <ErrorMessage errorValue={ touched.password && errors.password}/>} 
            style = {styles.input}
          />
          <Layout style = {styles.section}>
          <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Forgot')}>
            <Text status='primary' style = {{marginLeft: 'auto', padding: 10, paddingRight: 0,}}>Esqueceu sua senha?</Text>
          </TouchableWithoutFeedback> 
          </Layout>
          <Layout style = {styles.buttonRow}>
            { authState.error != null &&
              <ErrorMessage errorValue={authState.error} />
            } 
            <Button 
              onPress={handleSubmit} 
              status='success'
              appearance='filled'
              disabled={ isSubmitting || authState.isLoggin || !isValid }
              accessoryLeft={ (isSubmitting || authState.isLoggin) && LoadingIndicator }
            >Login</Button>
          </Layout>
        </Fragment>
      )}
    </Formik> 
  );
};

const styles = StyleSheet.create({  
  section: {
    marginTop: 12,
  },
  buttonRow:{
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 16
  },
  input:{
    marginTop: 16, 
  }
});
