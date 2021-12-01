import { api } from '.'
import auth from '@react-native-firebase/auth';

export const updateKYC = async(front_doc, back_doc, selfie_file, address_file) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 
  
  let data = {
    front_doc: front_doc,
    back_doc: back_doc,
    selfie_file: selfie_file,
    address_file: address_file
  }

  return await api.put('/user/kyc', data, config)
}