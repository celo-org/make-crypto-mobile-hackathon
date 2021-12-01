import { api } from '.'
import auth from '@react-native-firebase/auth';

export const updatePixKey = async(id, type, key) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 

  console.log(`id: ${id} | type: ${type} | key: ${key}`)

  let data =  {key_type: type, key: key}
  
  return await api.put(`/transactions/pix/${id}`, data, config)
}