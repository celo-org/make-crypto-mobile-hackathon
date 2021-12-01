//Importações Externas
import * as Yup from 'yup';
import { Formik } from "formik";
import LottieView from  "lottie-react-native";
import { useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import React, { Fragment, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import {   Button, Card, Layout, Modal, Spinner, Text, useTheme } from '@ui-kitten/components';
import { resquestWithrawCrypto } from '../api/requestWithdrawCrypto'
import { multiplier  } from '../shared/constants';
import { addUserBalance } from '../store/actions/user';
import * as NavigationService from '../navigation/NavigationService'; 
//Importações Internas
import { Toast } from '../components/PopUp';
import { InfoBox } from '../components/infoBox';
import { Account } from '../components/account'; 
import { generalStyle } from '../shared/generalStyle'; 
import { CustomHeader } from '../shared/customHeader';
import ErrorMessage from '../components/errormenssage'; 
import { LoadingIndicator } from "../shared/loadingIcon";
import { requestWithdrawPIX } from '../api/requestWithdrawPIX';
import SmoothPinCodeInput from '../components/smoothPinCodeInput'; 

//Regras de validação
const validationSchema = Yup.object().shape({
    pin: Yup.string().matches('[0-9]{4}', 'Insira apenas os digitos, sem pontos e traços').typeError('Deve-se especificar um código válido').required('O campo é obrigatório'),
})

export const ConfirmWithdrawScreen = (props) => {
 
    const theme = useTheme(); 
    const dispatch = useDispatch()

    const user = useSelector(state => state.userState);
    const wallet = useSelector(state => state.withdrawState);
    const type = props.route.params.type; 
    const variant = props.route.params.variant; 
    const [requestStatus, setRequestStatus] =  useState(type == 'crypto' ? 1 : 0); 
    const [visible, setVisible] = useState(true) 
    const [pin, setPin] = useState('')
   
    const RenderContent = () => {
        return (
            <View style = {styles.card}>  
                {(requestStatus == 5 ) && 
                    <Modal
                        visible={visible || (pin == '' && requestSent == false)}
                        backdropStyle={generalStyle.backdrop} >
                        <Card style = {{paddingVertical: 24, paddingHorizontal: 16}} disabled={true}>
                            <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}> 
                                <Text  style = {{marginTop: 8, fontWeight: 'bold', textAlign: 'left'}} category = 'h6'>Insira seu PIN</Text> 
                                <View style = {{width: '100%', padding: 16, marginTop: 24 }}>  
                                    <SmoothPinCodeInput password mask="﹡"
                                        cellSize={50}
                                        codeLength={4}
                                        value={pin}
                                        maskDelay={500}
                                        cellStyle = {{
                                        borderColor: 'rgb(228, 233, 242)',
                                        backgroundColor: 'rgb(247, 249, 252)',
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        marginRight: 8,
                                        marginLeft: 8,  
                                        }}
                                        cellStyleFocused = {{
                                            borderColor: theme['color-primary-default'],
                                            borderWidth: 2,
                                        }}
                                        onTextChange={code => setPin(code)}
                                        /> 
                                    </View> 
                                    <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 48}}>
                                        <Button status = 'success' onPress={() => request() }>
                                            Confirmar
                                        </Button>
                                    </Layout>
                            </Layout>          
                        </Card>
                    </Modal>
                }
                {requestStatus == 0 && 
                    <Layout style = {styles.container}>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                pin : '' 
                            }} 
                            onSubmit={(values, {setSubmitting, resetForm}) => {  
                                setPin(values.pin)
                                setRequestStatus(1)
                                requestWithdrawPIX(wallet.pixTransference.amount, wallet.pixTransference.pix_account, wallet.pixTransference.price, values.pin).then(response =>{
                                    console.log('PIN RE ' + JSON.stringify(response))
                                    dispatch(addUserBalance(user.balance - wallet.pixTransference.amount * multiplier))
                                    setRequestStatus(2)
                                }).catch(error =>{ 
                                    setRequestStatus(3)
                                    console.log("ERROR Saque" + JSON.stringify(error.response))
                                    Toast.show({
                                        title: 'Não conseguimos concluir a solicitação de saque',
                                        text: `${error.message}`,
                                        color: theme['color-danger-default']
                                    })
                                    setPin('')
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
                                <InfoBox title = {'Insira seu PIN'} style = {{marginBottom: 24}}/>
                                <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <SmoothPinCodeInput password mask="﹡"
                                    cellSize={50}
                                    codeLength={4}
                                    value={values.pin}
                                    maskDelay={500}
                                    cellStyle = {{
                                    borderColor: 'rgb(228, 233, 242)',
                                    backgroundColor: 'rgb(247, 249, 252)',
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    marginRight: 8,
                                    marginLeft: 8,  
                                    }}
                                    cellStyleFocused = {{
                                        borderColor: theme['color-primary-default'],
                                        borderWidth: 2,
                                    }}
                                    onTextChange={handleChange('pin')}/>
                                </View> 
                                <View style = {{marginBottom: 24}}></View>
                                    <ErrorMessage status = {'danger'} errorValue={touched.pin && errors.pin}/> 
                                <View style = {{paddingTop: 48}} >
                                <Button
                                onPress={handleSubmit}
                                status='success'
                                disabled={ isSubmitting || !isValid}
                                accessoryLeft={isSubmitting ? LoadingIndicator : null}
                                >{'Confirmar'}</Button>
                            </View>
                            
                            </Fragment>
                            )}
                        </Formik>
                    </Layout> 
                }
                {
                    requestStatus == 2 &&
                    <Layout style = {{padding: 24, alignItems: 'center', top: -10, marginBottom: -10, borderRadius: 10}}> 
                        <Animatable.View animation="slideInUp" duration = {2000}>
                            <LottieView
                                source={require("../assets/animations/successWithdraw.json")}
                                loop={false}
                                autoPlay 
                                style = {{width: 500, alignSelf: 'center', top: -60, marginBottom: -250}} 
                            /> 
                        </Animatable.View>
                        <Animatable.View animation="pulse" duration = {2000} style = {{flexDirection: 'row', backgroundColor: 'transparent'}}>
                            <Text category = 'h1' status = 'success'>{type == 'crypto' ? (wallet.cryptoTransference.ammount / multiplier).toFixed(2) : wallet.pixTransference.amount}</Text>
                            <Text category = 'h5' status = 'success'  style = {{marginTop: 15}}> cUSD</Text>
                        </Animatable.View>
                        <Layout style = {{padding: 16,  bottom: 0 , width: '100%'}} >
                            <Button  
                            onPress = { () => NavigationService.navigate('Home')}
                            status='primary'    
                            >Continuar</Button>
                        </Layout>
                        
                    </Layout>
                }
                {
                    requestStatus == 1 &&
                    <View style = {{paddingTop: 64}}>
                        <Spinner size = 'large' status = 'info'/>
                    </View>
                } 
                { requestStatus == 3 &&
                    <View styles = {{paddingTop: 64}}>
                        <LottieView
                                source={require("../assets/animations/errorTask.json")}
                                loop={false}
                                autoPlay 
                                style = {{width: 200, alignSelf: 'center', top: 64 }} 
                        /> 
                    </View>
                }
                  
                <Layout style = {{width: '100%', marginTop: 24 }}> 
                    <Text category='s1' style = {{fontWeight: 'bold', marginVertical: 24}}>{type == 'crypto' ? 'Conta de Destino' : 'PIX de Destino'}</Text>
                    <Animatable.View  animation="pulse" duration = {3000}  >
                        <Account type = {type} variant = {variant} navigation = {props.navigation}/>
                    </Animatable.View>
                </Layout> 
            </View>
        )}
 

    const request = () => {
        setVisible(false) 
        // setRequestStatus(4)
        if(type == 'crypto'){ 
            console.log(`\n\n\n\n\n\n\n\n\nEndereço: ${wallet.cryptoTransference.address} | Amount: ${wallet.cryptoTransference.ammount} | Wallet: ${wallet.selected_wallet}`)
            resquestWithrawCrypto(wallet.cryptoTransference.address, wallet.cryptoTransference.ammount, user.selected_wallet).then( response => {
                setRequestStatus(2)
                // console.log("CRYPTO " + JSON.stringify(response.data))
                // console.log(JSON.stringify(response))
                dispatch(addUserBalance(response.data.balance))
            }).catch( error => {
                setRequestStatus(3)
                console.log("ERROR " + JSON.stringify(error.response))
                // setHasError(true)  
                Toast.show({
                    title: 'Tivemos um erro',
                    text: `${error.message}`,
                    color: theme['color-danger-default']
                })
            })
        }else if (type == 'fiat'){
            console.log(`value: ${wallet.pixTransference.amount} | pix Account: ${wallet.pixTransference.pix_account} | price: ${wallet.pixTransference.price} | code: ${pin} | carteira ${wallet.selected_wallet}`)
            if(requestStatus == 1){
                // requestWithrawPIX(wallet.pixTransference.amount, wallet.pixTransference.pix_account, wallet.pixTransference.price, pin, user.selected_wallet).then(response =>{
                //     console.log(JSON.stringify(response.data))
                //     dispatch(addUserBalance(user.balance - wallet.pixTransference.amount * multiplier))
                //     setRequestStatus(2)
                // }).catch(error =>{
                //     setPin('')
                //     setRequestStatus(3)
                //     Toast.show({
                //         title: 'Não conseguimos concluir a solicitação de saque',
                //         text: `${error.message}`,
                //         color: theme['color-danger-default']
                //     })
                // })
            } 
        }
    }

    useEffect(() => {
        // console.log("USER: " + JSON.stringify(user))
        request()
        // if(type == 'crypto'){ 
        //     resquestWithrawCrypto(wallet.cryptoTransference.address, wallet.cryptoTransference.ammount).then( response => {
        //         setRequestStatus(2)
        //         // console.log("CRYPTO " + JSON.stringify(response.data))
        //         // console.log(JSON.stringify(response))
        //         dispatch(addUserBalance(response.data.balance))
        //     }).catch( error => {
        //         setRequestStatus(3)
        //         // setHasError(true) 
        //         Toast.show({
        //             title: 'Tivemos um erro',
        //             text: `${error.message}`,
        //             color: theme['color-danger-default']
        //         })
        //     })
        // }
    }, [props.navigation]) 
 
    return (
        <Fragment>
            { Platform.OS == 'ios' &&
            <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
            }
            <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#FFFFFF'}}>
            {/* <ReactNativeParallaxHeader
                headerMinHeight={56}
                headerMaxHeight={220}
                extraScrollHeight={20}
                navbarColor= {theme['color-primary-default']}
                backgroundImage={require('../assets/images/confirm_bg.jpg')}
                renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Sucesso'} subtitle = {'teddf'} backDisabled = {true}/>}
                renderContent={renderContent}
            /> */}

            <CustomHeader navigation = {props.navigation} title = {'Confirmação'} subtitle = {'teddf'} backDisabled = {true}/> 
            <ScrollView>
                <RenderContent/>
            </ScrollView>
            
        </SafeAreaView>
        </Fragment>
    );
};


const styles = StyleSheet.create({
    container: {
      width: '100%', 
    }, 
    card: {
        // flexDirection: 'row',
        paddingVertical: 24,
        paddingHorizontal: 16,  
        justifyContent: 'space-around',
        alignItems: 'center', 
    }, 
  });
      