//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik"; 
import { StyleSheet, View} from "react-native";
import React, { Fragment, useState, }  from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import { Button, Input, Layout, Text, Icon, Modal, Card, useTheme } from '@ui-kitten/components';

//Importações Internas 
import { InfoBox } from './infoBox';
import ErrorMessage from './errormenssage'; 
import { generalStyle } from '../shared/generalStyle';
import { LoadingIndicator } from '../shared/loadingIcon';
import { setCryptoWallet, setOriginWallet, setPixWalletPhone, setPixWalletEmail, setPixWalletCPFCNPJ, setPixWalletRandomkey } from '../store/actions/withdraw'
import * as NavigationService from '../navigation/NavigationService'; 
 
export const AddAccountCrypto = (props) => {
  
  const theme = useTheme();
  const dispatch = useDispatch();

  const variant = props.variant
  
  const wallet = useSelector(state => state.withdrawState);
  
  const [visible, setVisible] = useState(false); 
  
  const keyValues = {
    'lovecrypto': {title: 'cUSD', initialKeyValue: wallet.cryptoWallet}, 
    'celo': {title: 'cUSD', initialKeyValue: wallet.cryptoWallet}, 
  }

  console.log("PROPS  " + JSON.stringify(props))
  
  

  const saveKeyValues = (variant, address) => {
    dispatch(setCryptoWallet(variant, address));
    dispatch(setOriginWallet(props.variant))
    // switch (variant) {
    //   case 'CUSD':
    //     dispatch(setCryptoWallet(variant, address));
    //     break; 
    // }
    props.navigation.navigate('Requestwithdraw', {type: 'crypto', variant: variant}) 
  }
  
  const validator = (variant) =>{
  
    let schema = null; 
    switch (variant) {
      case 'CUSD':
        schema = Yup.string().matches('^0x[a-fA-F0-9]{40}$', 'O formato do endereço está errado').required('Este campo é obrigatório')
        break; 
    }
   
    return schema
  }
  


  //Regras de validação
  const validationSchema = Yup.object().shape({
    address: validator(variant)
  })

  // const saveKey = (variant, address) => {
 

  //   if(keyValues[variant].initialKeyValue.address == null){  
  //     sendPixKey(variant, address).then(response=>{
  //       Toast.show({
  //         title: 'Chave pix salva com sucesso', 
  //         color: theme['color-info-default']
  //       }) 
  //       console.log("SALVANDO " + JSON.stringify(response))
  //       saveKeyValues(variant, response.data.id , response.data.address)
  //       NavigationService.navigate('Requestwithdraw', {type: 'fiat', variant: variant}) 
  //       // dispatch(setPixWalletPhone(null, address));
  //       // props.navigation.navigate('Requestwithdraw', {type: 'fiat', variant: variant}) 
  //     }).catch(error =>{  
  //       error_flag = true;
  //       Toast.show({
  //         title: 'Chave não enviada',
  //         text: 'Tivemos um problema ao salvar sua chave',
  //         color: theme['color-danger-default']
  //       }) 
  //     }) 
  //   }else{
  //     updatePixKey(keyValues[variant].initialKeyValue.id, 'PHONE', keyValues[variant].initialKeyValue.address).then( response =>{ 
  //       Toast.show({
  //         title: 'Chave pix atualizada com sucesso', 
  //         color: theme['color-info-default']
  //       }) 
  //       saveKeyValues(variant, response.data.id, response.data.address)
  //       NavigationService.navigate('Requestwithdraw', {type: 'fiat', variant: variant}) 
  //       // dispatch(setPixWalletPhone(response.data.id, response.data.address));
  //       // props.navigation.navigate('Requestwithdraw', {type: 'fiat', variant: variant}) 
  //     }).catch(error =>{ 
  //       console.log('SADAS' + JSON.stringify(error))
  //       error_flag = true;
  //       Toast.show({
  //         title: 'Chave não atualizada',
  //         text: 'Tivemos um problema ao salvar sua chave',
  //         color: theme['color-danger-default']
  //       }) 
  //     }) 
  //   } 
  // }


  const Add = () => {
    return(
      <View style={{flex: 1, paddingVertical: 24, paddingHorizontal: 16}}> 
        <InfoBox title = 'Sacando em cripto: ' subtitle = {keyValues[variant].title}/>
       
          <Text style = {{marginTop: 24, marginBottom: 24, textAlign: 'center'}}>{ 'Insira o endereço da carteira de destino'}</Text> 
          <Formik
            initialValues={{
              address: keyValues[variant].initialKeyValue.address
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
            const { address } = values;
            // setVisible(true)  
            saveKeyValues(variant, address)

          resetForm({address: address})
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
                <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
                  <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon fill='white' style = {{height: 24, width: 24}} name='phone-outline'/>
                  </Layout> 
                    <Text  style = {{marginTop: 8}} category = 'h6'>{keyValues[variant].initialKeyValue.address}</Text>
                    <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>O endereço está correto?</Text>
                    <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                        <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                        Editar
                        </Button>
                        <Button style = {{margin: 12}} status = 'success' onPress={() => {handleSubmit(), setVisible(false)}}>
                        Confirmar
                        </Button>
                    </Layout>
                  </Layout>          
              </Card>
            </Modal>
            <Input
              name='address'
              value={values.address}
              onChangeText={handleChange('address')}
              placeholder={`Endereço da carteira de ${keyValues[variant].title}` }
              onBlur={handleBlur('address')}
              size = 'large' 
            />
            <ErrorMessage status = 'hint' errorValue={touched.address && errors.address} />
            <Text appearance = 'hint' style = {{marginTop: 32, textAlign: 'center'}}>{ 'Ao confirmar, iremos verificar seus dados'}</Text> 
            <Layout style = {{paddingTop: 64,}} >
              <Button 
                onPress={handleSubmit} 
                status='success'
                accessoryLeft={ isSubmitting ? LoadingIndicator : null}
                disabled={ isSubmitting || !isValid }
                >Confirmar</Button>
            </Layout>
          </Fragment>
        )}
      </Formik>
    </View>
    )
  }

 
  return (
    <Add/>
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





// //Importações Externas
// import * as Yup from 'yup';
// import { Formik } from "formik";
// import React, { Fragment, useContext }  from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { Button, Input, Layout, Text } from '@ui-kitten/components'; 

// //Importações Internas
// import { InfoBox } from './infoBox';
// import ErrorMessage from './errormenssage';
// import { showToast } from '../shared/showToast'; 
// import { TooltipInfo } from '../shared/tooltipInfo';
// import { clickInfoEvent } from '../shared/analyticsLog';
// import { LoadingIndicator } from '../shared/loadingIcon';
// import { setCryptoWallet } from '../store/actions/withdraw';

// const renderHashIcon = (props) => (
//   <TooltipInfo {...props} text = 'O endereço é o identificador da carteira de destino' onPress = { () =>  clickInfoEvent('hash', 'AddCrypto')} />
// );
  
// //Componente para login/signup com email
// export const AddAccountCrypto = (props) => {
 
//   //Tradução
//   // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
//   //initializeAppLanguage(); //
 
//   const dispatch = useDispatch();

//   const wallet = useSelector(state => state.withdrawState);

//   const saveCryptoAccount = async (id, hash) => {
//     dispatch(setCryptoWallet( id, hash))
//   };

//   const variant = props.variant

  
//   const validator = (variant) =>{
  
//     let schema = null;
 
//     switch (variant) {
//       case 'CUSD':
//         schema = Yup.string().matches('^0x[a-fA-F0-9]{40}$', 'O formato do endereço está errado').required('Este campo é obrigatório')
//         break;
//       case 'CELO':
//         schema = Yup.string().matches('^0x[a-fA-F0-9]{40}$', 'O formato do endereço está errado').required('Este campo é obrigatório')
//         break; 
//       default:
//         break;
//     } 
//     return schema
//   }
   
//   //Regras de validação
//   const validationSchema = Yup.object().shape({
//     hash: validator(variant)
//   })
 
//   return (
//     <Layout style={{flex: 1}}>
//       <InfoBox title = {'Sacando em cripto '} subtitle = {variant}/>
//       <Layout style = {{flexDirection: 'row', alignItems: 'center'}}>
//         <Text category='s1' style = {{marginBottom: 32, marginTop: 24}}>{'Insira o endereço da carteira Celo para qual deseja enviar'}</Text>
//       </Layout>
//       <Formik
//         initialValues={{
//           hash: variant == wallet.cryptoWallet.id ? wallet.cryptoWallet.address : ''
//         }}
//         onSubmit={(values, {setSubmitting, resetForm}) => {
//           const { hash } = values;
//           dispatch(setCryptoWallet(variant, hash))
//           showToast('Carteira adicionada')
//           resetForm({hash: ''})
//           setSubmitting(false);
//           props.navigation.navigate('Requestwithdraw', {type: 'crypto', variant: variant})
//         }}
//         validationSchema={validationSchema}>
//         {({
//           handleChange,
//           values,
//           handleSubmit,
//           errors,
//           isValid,
//           touched,
//           handleBlur,
//           isSubmitting
//         }) => (
//           <Fragment>
//             <Input
//               name='hash'
//               value={values.hash}
//               onChangeText={handleChange('hash')}
//               placeholder={'Endereço da carteira Celo'}
//               onBlur={handleBlur('hash')}
//               size = 'large'
//               accessoryRight = {renderHashIcon}
//               autoFocus
//               style = {{marginBottom: 6}}
//             />
//             <ErrorMessage status = 'hint' errorValue={touched.hash && errors.hash} />
//             <Text appearance = 'hint' style = {{marginTop: 32, textAlign: 'center'}}>{'Ao confirmar, iremos verificar seus dados'}</Text>
//             <Layout style = {{paddingTop: 48 }} >
//               <Button
//                 onPress={handleSubmit}
//                 status='success'
//                 accessoryLeft={ isSubmitting ? LoadingIndicator : null}
//                 disabled={ isSubmitting || !isValid }
//                 >{'Confirmar'}</Button>
//             </Layout>
//           </Fragment>
//         )}
//       </Formik>
//     </Layout>
//   );
// };

