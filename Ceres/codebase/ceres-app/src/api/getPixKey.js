import { api } from '.'
import auth from '@react-native-firebase/auth';

export const getPixKey = async () =>{
  tasks = null;
  token = await auth().currentUser.getIdToken()
   
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }  
   
  return await api.get('/transactions/pix', config) 
}