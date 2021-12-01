//Importações Externas
import React from 'react'
import { Text, Layout, useTheme, Button} from '@ui-kitten/components' 

//Importações Internas
import { Toast } from './PopUp';
import { emailConfirmation } from '../api/emailConfirmation';  

const ErrorMessage = ({ errorValue, status, verify, navigation }) => { 

  const theme = useTheme();
  const switcher = status!= null ? status : 'info'

  const verifyClick = () =>{
    switch(verify){
      case 'phone':
        navigation.navigate('ValidatePhone')
        break;
      case 'email': 
        emailConfirmation().then(() => {
          Toast.show({
            title: 'Email enviado',
            text: `Email de verificação enviado para sua caixa de entrada, cheque também a caixa de SPAM do email ${user.email}`,
            color: theme['color-info-default']
          })
        }).catch(error => {
          Toast.show({
            title: 'Tivemos um erro',
            // text: `Email de verificação enviado para sua caixa de entrada, cheque também a caixa de SPAM do email ${user.email}`,
            color: theme['color-danger-default']
          })
        })
        break;
      default:
        break;
    }
  }
  
  //Mensagem de erro de entrada de campo 
  if ( errorValue != undefined ){
    return(
      <Layout style = {{flex: 1, backgroundColor:  theme[`color-${switcher}-100`] ,paddingVertical: 4, borderRadius: 4, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text category='s2' status = {switcher}>{ errorValue }</Text>
        {verify != null && 
           <Button size = 'tiny' appearance='outline' status = {switcher} onPress = {() => verifyClick()}>Verificar</Button>
        }
      </Layout>
    )
    //Quando não há erro
  }else{
    return null
  }
  //Mensagens de erro de signin/signup
   
}


export default ErrorMessage