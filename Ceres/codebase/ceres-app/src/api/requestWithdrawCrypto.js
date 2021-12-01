import { api } from '.';
import auth from '@react-native-firebase/auth';
 
export const resquestWithrawCrypto = async (address, amount, identifier) => {
    token = await auth().currentUser.getIdToken()
    
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    data = { 
      destination_address: address, 
      amount: amount,
      identifier: identifier
    }
     

    return await api.post('/transactions/transfer', data, config)
    
  }