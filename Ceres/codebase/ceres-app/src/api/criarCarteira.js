import { api } from '.';
import auth from '@react-native-firebase/auth';
 
export const criarCarteira = async () => {
    token = await auth().currentUser.getIdToken()
    
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }
   
    data = {  
    } 

    return await api.post('/celo-wallet', data, config)
  }
 