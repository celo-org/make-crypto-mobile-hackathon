import { api } from './'
import auth from '@react-native-firebase/auth';

const getTransactions = async () =>{
  token = await auth().currentUser.getIdToken()
  
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 
  
  return await api.get('/transactions', config) 
}

export default getTransactions;