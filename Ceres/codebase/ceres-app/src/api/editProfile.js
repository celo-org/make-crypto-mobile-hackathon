import { api } from '.'
import auth from '@react-native-firebase/auth';

 
export const editProfile = async (name, interests, phone, birthday, gender, cpf, address) => {
   
    let token = await auth().currentUser.getIdToken()

    config = {
      headers: { Authorization: `Bearer ${token}` }
    } 
      
    let data = {
        name: name, 
        address: address,
        interests: interests,
        phone: phone,
        birthday: birthday,
        gender: gender,
        cpf: cpf,
    } 
    
    return await api.post('/user/update', data, config)
   
  }