import { api } from '.'
import auth from '@react-native-firebase/auth';

export const requestPhoneConfirmation = async(code) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 
  const data = code != null ?{ code: code } : {}

  console.log("Novo código telefone " + JSON.stringify(data))
  

  return await api.post('/auth/confirm-number', data, config)
}