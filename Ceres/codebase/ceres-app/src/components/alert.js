//Importações Externas
import auth from '@react-native-firebase/auth';
import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, TouchableNativeFeedback} from "react-native";
import { Layout, Icon, Text, useTheme, Button} from '@ui-kitten/components'
 
//Importações Internas
import { showToast } from '../shared/showToast';
import { getData } from '../memoryAccess/getData';
import { emailConfirmation } from '../api/emailConfirmation';
export const Alert = (props) => {

    const [isConfirmed, setIsConfirmed] = useState(auth().currentUser != null ? auth().currentUser.emailVerified : null)
    const [checked, setchecked] = useState(false);
    const [visible, setVisible] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        if(auth().currentUser != null){
            setIsConfirmed(auth().currentUser.emailVerified)
        }
    }, []);

    const sendConfirmUser = () => {
        if(auth().currentUser != null){
            // auth().currentUser.sendEmailVerification()
            try{
                // auth().currentUser.sendEmailVerification()
                emailConfirmation() 
            }catch(error){
                console.log('Login api error: ' + error.message)
            }
        }
        getData('@userData').then(data => {
            showToast('Confira sua caixa de entrada e de spam do email ' + data.email)
            setVisible(false)
        })
    }

    function changeState(){
        setchecked(!checked)
    }

    return (
        <Fragment>
            { visible && !isConfirmed &&
            <Layout style = {{ width: '100%', marginVertical: 16, borderBottomWidth: 1, borderColor: '#E7ECF4', marginVertical: 8}}>  
                <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple(theme['color-danger-100'])}  onPress={changeState}>
                    <Layout style = {{ padding: 16, borderRadius: 10, borderBottomRightRadius: checked? 0 : 10, borderBottomLeftRadius: checked? 0 : 10, display: 'flex', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', backgroundColor: theme['color-danger-300']}}>
                        <Text category = 'p1' style = {{maxWidth: 300}} >Ative sua conta</Text>
                        <Icon fill='#222B45' style = {{height: 24, width: 24, alignSelf: 'right'}} name={checked ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'}/>
                    </Layout>
                </TouchableNativeFeedback>
                {checked && 
                <Layout style = {{ padding: 16,  borderBottomRightRadius: 10, borderBottomLeftRadius: 10, flexDirection: 'column', backgroundColor: theme['color-danger-100'] }}>
                    <Text category = 'p1' >Para ter acesso a todas as funções do app você deve ativar sua conta no email enviado para o email cadastrado</Text>
                    <Layout style={styles.buttonRow}>
                        <Button size = 'small' status='danger' style = {{margin: 4}} onPress = { () => setVisible(false)}>Lembrar Mais Tarde</Button>
                        <Button size = 'small' status='success' style = {{margin: 4}} onPress = { () => sendConfirmUser()}>Reenviar Confirmação</Button>
                    </Layout>
                </Layout>
                }
            </Layout>
            }
        </Fragment>
    );
    }

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  text:{
    color : '#7A05C8'
  },
  buttonRow:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        paddingTop: 16,
    }
});