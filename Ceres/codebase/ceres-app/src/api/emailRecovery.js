import { api } from '.'
import auth from '@react-native-firebase/auth';

export const emailRecovery = async(email) => {
  // token = await auth().currentUser.getIdToken()
  // config = {
  //   headers: { Authorization: `Bearer ${token}` }
  // } 
  
  let data = { email: email }

  return await api.post('/recovery-password', data)
}