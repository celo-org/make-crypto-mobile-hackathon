import { api } from '.'
import auth from '@react-native-firebase/auth';

 
const editProfilePhone = async (phone) => {
   
    let token = await auth().currentUser.getIdToken()

    config = {
      headers: { Authorization: `Bearer ${token}` }
    } 
      
    let data = { 
      phone: phone,
    } 
    
    return await api.post('/user/update', data, config)
   
  }

export default editProfilePhone;