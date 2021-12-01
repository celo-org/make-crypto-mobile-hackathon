import { api } from '.'
import auth from '@react-native-firebase/auth';

 
export const setPinApi = async (pin) => { 

    token = await auth().currentUser.getIdToken()
    config = {
      headers: { Authorization: `Bearer ${token}` }
    } 
      
    const data = { 
        password: pin,
    } 

    return await api.post('/user/four-digits-password', data, config)
  }