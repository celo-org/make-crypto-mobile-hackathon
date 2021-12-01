import { api } from '.'
import auth from '@react-native-firebase/auth';

 
export const updatePinApi = async (actualPin, newPin) => { 

    token = await auth().currentUser.getIdToken()
    config = {
      headers: { Authorization: `Bearer ${token}` }
    } 
      
    const data = { 
        password: actualPin,
        new_password: newPin
    } 

    return await api.put('/user/four-digits-password', data, config)
  }