//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import { View } from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import React, { Fragment, useState }  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TouchableWithoutFeedback, Linking } from "react-native";
import { Button, Input, Layout, Icon, Text, CheckBox, useTheme } from '@ui-kitten/components';

//Importações Internas
import { loginApi } from '../../../api/login';
import ErrorMessage from '../../errormenssage';
import { registerApi } from '../../../api/signup';
import { setUser, setUserPhoto } from '../../../store/actions/user';
import LoadingIndicator from '../../../shared/loadingIcon';
import { loginStart, loginFailure, loginSuccess, signUpStart, signUpSuccess, signUpFailure } from '../../../store/actions/auth'
import { emailConfirmation } from '../../../api/emailConfirmation';
//Regras de validação
export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Por favor insira um email'),
  password: Yup.string()
    .label('Password')
    .required('Este campo é obrigatório')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(10, 'A senha deve ter no máximo 10 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'A confirmação deve coincidir com a senha')
    .required('A confirmação é obrigatória')
})
 
//Componente para signup com email
export const Signup = (props) => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false); 
  const theme = useTheme();
  const authState = useSelector(state => state.authState);

  const MailIcon = (props) => (
    <Icon {...props} name='email'/>
  );
  
  const Terms = (navigation) =>  {
    return(
      <TouchableWithoutFeedback onPress={() => Linking.openURL('https://lovecrypto.net/terms-of-use/')}>
        <Text category='c1' status='primary' style = {{fontWeight: 'bold'}}> termos</Text>
      </TouchableWithoutFeedback>
    )  
  } 

  const Conditions = (navigation) =>  {
    return(
      <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.lovecrypto.net/privacy-policy')}>
        <Text category='c1' status='primary' style = {{fontWeight: 'bold'}}> condições</Text>
      </TouchableWithoutFeedback>
    )  
  } 

  const PersonIcon = (props) => (
    <Icon {...props} name='person'/>
  );
  
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
  
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
 
  const signup = async (email, name, password) => {
    dispatch(signUpStart('EMAIL'))
    //Iniciando Signup No Firebase
    // console.log('SIGNUP Com email')
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then( res => {
      // console.log('Criou no firebase')
      //Iniciando Signup Na API
      registerApi(email, name, res.user.uid, authState.referedBy).then(async()=> {
        // console.log('Criou no a api')
        dispatch(signUpSuccess())
        //Iniciando Login na API
        dispatch(loginStart('EMAIL'))
        try{
          // auth().currentUser.sendEmailVerification()
          await emailConfirmation() 
        }catch(error){
          console.log('Login api error: ' + error.message)
        }
        try{
          const response = await loginApi() 
          const userAPI = response.data.user_data;
          dispatch(loginSuccess())
          // console.log('Logou na api')
          dispatch(setUser(userAPI))
          dispatch(setUserPhoto(auth().currentUser.photoURL)) 
        }catch ( error ) {
          console.log('Login api error: ' + error.message)
          dispatch(loginFailure(error.message)) 
        }
        //Final login API
      }).catch(error => {
        dispatch(signUpFailure(error.message))
        console.log('ERRO DE SIGNUP ' + error.message)
      })
      //Final Signup na API
    })
    .catch(error => {
      console.log(error.message);
      dispatch(signUpFailure(error.message))
       
    });
  };  

  return (
    <Fragment>
      <View style = {{backgroundColor:  theme['color-info-100'], borderRadius: 4, padding: 16, flexDirection: 'row'}}>
        <Text style = {{color:  theme['color-info-900'], }}> {authState.referedBy != null ? 'Usando código de indicação' : 'Cadastrando sem código de indicação'}</Text>
        <Text style = {{fontWeight: 'bold', color:  theme['color-info-900'], }}> {authState.referedBy}</Text>
      </View>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={(values, {setSubmitting, resetForm})=> {
          const { name, email, password } = values;
          signup(email, name, password).then( () => {
            resetForm({name: '', email: '', password: '', confirmPassword: ''})
          })
          setChecked(false)
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
          <Fragment>
            <Input
              name='name'
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder='Nome'
              onBlur={handleBlur('name')}
              caption={ () => <ErrorMessage errorValue={touched.name && errors.name}/> }
              accessoryRight ={ PersonIcon}
              style = {styles.input}
            />
            <Input
              name='email'
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder='Email'
              autoCapitalize='none'
              onBlur={handleBlur('email')}
              caption={ () => <ErrorMessage errorValue={touched.email && errors.email}/>} 
              accessoryRight={MailIcon}
              style = {styles.input}
            />
            <Input
              name='password'
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder='Senha'
              accessoryRight={renderPasswordIcon}
              secureTextEntry={secureTextEntry}
              onBlur={handleBlur('password')}
              caption={ () => <ErrorMessage errorValue={touched.password && errors.password} />} 
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
              style = {styles.input}
            />
            <ErrorMessage visible = {touched.confirmPassword} errorValue={errors.confirmPassword}/>
            <Layout style = {styles.section} >
              <CheckBox
                checked={checked}
                status='success'
                onChange={onCheckedChange}
              > 
              </CheckBox>
              <Text category='c1' status='primary' style = {{marginLeft: 10}}>Concordo com os</Text> 
              <Terms />
              <Text category='c1' status='primary'> e</Text> 
              <Conditions /> 
            </Layout>
            <Layout style = {styles.buttonRow}>
              { authState.error != null &&
                <ErrorMessage errorValue={authState.error} />
              }
              <Button 
                onPress={handleSubmit} 
                status='success'
                disabled={ authState.isLoggin || isSubmitting || !isValid || !checked}
                accessoryLeft={ (isSubmitting || authState.isLoggin) && LoadingIndicator  }
                >Cadastro</Button>
              </Layout>
          </Fragment>
        )}
        </Formik>
    </Fragment>
  );
};

const styles = StyleSheet.create({  
  section: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    
  },
  input:{
    marginTop: 16,
  },
  buttonRow:{
    backgroundColor: 'transparent',
    width: '100%',
    paddingTop: 24,
  },
});
