//Importações Externas
import { api } from './';
import auth from '@react-native-firebase/auth';
 
export const loginApi = async () => {
  user = null;
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 
  
  console.log(JSON.stringify(config))

  return await api.get('/auth', config)
}