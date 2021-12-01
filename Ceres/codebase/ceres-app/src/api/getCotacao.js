import { api } from '.'
import auth from '@react-native-firebase/auth';

export const  getCotacao = async () =>{
  
  token = await auth().currentUser.getIdToken()

  config = {
    headers: { Authorization: `Bearer ${token}` }
  }  
      
  return await api.get('/transactions/price/cusd', config)
}