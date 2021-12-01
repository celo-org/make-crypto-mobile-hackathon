//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik"; 
import { StyleSheet, View } from "react-native"; 
import React, { Fragment, useState, }  from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Layout, Text, Icon, Modal, Card, useTheme } from '@ui-kitten/components';

//Importações Internas
import { Toast } from '../PopUp';
import ErrorMessage from '../errormenssage';
import { sendPixKey } from '../../api/sendPixKey'; 
import { updatePixKey } from '../../api/updatePixKey'; 
import { generalStyle } from '../../shared/generalStyle';
import { LoadingIndicator } from '../../shared/loadingIcon';
import { setPixWalletPhone } from '../../store/actions/withdraw';
import * as NavigationService from '../../navigation/NavigationService'; 

//Regras de validação
const validationSchema = Yup.object().shape({
  key: Yup.string().matches(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, 'Insira apenas os digitos, sem pontos e traços').required('Este campo é obrigatório')
})

export const PhoneComponent = (props) => {
  
  const theme = useTheme();
  const dispatch = useDispatch();

  const variant = 'PHONE';
  
  const wallet = useSelector(state => state.withdrawState);
  
  const [visible, setVisible] = useState(false);

  let Phone_ref = null; 
  
  const keyValues = {
    'PHONE': {title: 'Telefone', initialKeyValue: wallet.fiatWallet.phone},
    'EMAIL': {title: 'Email',  initialKeyValue: wallet.fiatWallet.email},
    'CPF': {title: 'CPF/CNPJ', initialKeyValue: wallet.fiatWallet.cpf_cnpj}, 
    'RANDOM': {title: 'Chave Aleatória',  initialKeyValue: wallet.fiatWallet.randomkey},  
  }
  
 

  const saveKey = (variant, key) => { 

    if(keyValues[variant].initialKeyValue.key == null){  
      sendPixKey(variant, key).then(response=>{
        Toast.show({
          title: 'Chave pix salva com sucesso', 
          color: theme['color-info-default']
        }) 
        console.log("SALVANDO " + JSON.stringify(response))
        dispatch(setPixWalletPhone( response.data.id, response.data.key));
        NavigationService.navigate('Requestwithdraw', {type: 'fiat', variant: variant})  
      }).catch(error =>{  
        error_flag = true;
        Toast.show({
          title: 'Chave não enviada',
          text: 'Tivemos um problema ao salvar sua chave',
          color: theme['color-danger-default']
        }) 
      }) 
    }else{
      if(keyValues[variant].initialKeyValue.key != key){ 
        updatePixKey(keyValues[variant].initialKeyValue.id, variant, key).then( response =>{ 
          Toast.show({
            title: 'Chave pix atualizada com sucesso', 
            color: theme['color-info-default']
          })  
          dispatch(setPixWalletPhone( response.data.id, response.data.key));
          NavigationService.navigate('Requestwithdraw', {type: 'fiat', variant: variant})  
        }).catch(error =>{ 
          console.log('SADAS' + JSON.stringify(error))
          error_flag = true;
          Toast.show({
            title: 'Chave não atualizada',
            text: 'Tivemos um problema ao salvar sua chave',
            color: theme['color-danger-default']
          }) 
        }) 
      }else{
        NavigationService.navigate('Requestwithdraw', {type: 'fiat', variant: variant})  
      }
    }  
  }
  
  return (
    <Formik
      initialValues={{
        key: ''
      }}
      onSubmit={(values, {setSubmitting, resetForm}) => {

      let Phone_noMask = Phone_ref.getRawValue();
      
      saveKey(variant, Phone_noMask) 
      resetForm({key: Phone_noMask})
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
        <Modal
          visible={visible}
          backdropStyle={generalStyle.backdrop}
          onBackdropPress={() => setVisible(false)}>
          <Card disabled={true}>
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                <Icon fill='white' style = {{height: 24, width: 24}} name='phone-outline'/>
              </View> 
                <Text  style = {{marginTop: 8}} category = 'h6'>{values.key}</Text>
                <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>A chave está correta?</Text>
                <View style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                    <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                    Editar
                    </Button>
                    <Button style = {{margin: 12}} status = 'success' onPress={() => {handleSubmit(), setVisible(false)}}>
                    Confirmar
                    </Button>
                </View>
              </View>          
          </Card>
        </Modal>  
        <TextInput
            label={`Adicionar chave PIX - ${keyValues[variant].title}`}
            mode = "outlined"
            value={values.key} 
            style = {[generalStyle.input, {marginTop: 24}]}
            render={props =>
              <TextInputMask
                type={'cel-phone'}
                {...props} 
                onChangeText={handleChange('key')}
                style = {generalStyle.inputMask}
                ref = {ref => Phone_ref = ref}
              />}
        /> 
        <ErrorMessage status = {'danger'} errorValue={touched.key && errors.key} />
        <Text appearance = 'hint' style = {{marginTop: 48, textAlign: 'center'}}>Ao confirmar, iremos verificar seus dados</Text> 
        <Layout style = {{paddingTop: 24,}} >
          <Button 
            onPress={() => setVisible(true) } 
            status='success'
            accessoryLeft={ isSubmitting ? LoadingIndicator : null}
            disabled={ isSubmitting || !isValid }
            >Confirmar</Button>
        </Layout>
      </Fragment>
    )}
  </Formik>
  );
};

const styles = StyleSheet.create({  
  section: {
    // paddingTop: 8,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  input:{
    paddingTop: 8,
  },
  
  container:{
    width: '100%'
  }
});
