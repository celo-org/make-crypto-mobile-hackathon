import { api } from '.'
import auth from '@react-native-firebase/auth';

export const sendKYC = async(front_doc, back_doc, selfie_file, address_file) => {
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 

  // let data =  {key_type: type, key: key}


  let data = {
    front_doc: front_doc,
    back_doc: back_doc,
    selfie_file: selfie_file,
    address_file: address_file
  }

  console.log("DATA " + JSON.stringify(data))

  return await api.post('/user/kyc', data, config)
}