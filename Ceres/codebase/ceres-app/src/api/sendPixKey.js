import { api } from '.'
import auth from '@react-native-firebase/auth';

export const sendPixKey = async(type, key) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 
  let data =  {key_type: type, key: key}
  console.log('Send Pix API ' + JSON.stringify(data))
  return await api.post('/transactions/pix', data, config)
}