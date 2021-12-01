import { api } from './'
import auth from '@react-native-firebase/auth';

export const emailConfirmation = async() => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 

  let data =  {}
 
  return await api.post('/auth/confirm-email', data, config)
}