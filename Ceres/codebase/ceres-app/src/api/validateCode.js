import { api } from '.'
import auth from '@react-native-firebase/auth';

export const validateCodeApi = async(code) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  data = {
    code: code,
  } 
  return await api.post('/promotion/validate', data, config)
}