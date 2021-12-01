import { api } from '.';
import auth from '@react-native-firebase/auth';
 
export const resquestWithrawCrypto = async (phone, amount) => {
    token = await auth().currentUser.getIdToken()
    
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    data = { "destination_address": phone, "amount": amount }
    
    // console.log('DATA enviado ' + JSON.stringify(data))

    return await api.post('/transactions/transfer', data, config)
    
  }