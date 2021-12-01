import { api } from '.'
import auth from '@react-native-firebase/auth';

 
const editProfileCPF = async (cpf) => {
   
    let token = await auth().currentUser.getIdToken()

    config = {
      headers: { Authorization: `Bearer ${token}` }
    } 
      
    let data = { 
      cpf: cpf,
    } 
    
    return await api.post('/user/update', data, config)
   
  }

export default editProfileCPF;