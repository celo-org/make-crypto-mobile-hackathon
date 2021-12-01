import { api } from '.';
import auth from '@react-native-firebase/auth';
 
export const requestWithdrawPIX = async (amount, pix_account, price, code, identifier) => {
    token = await auth().currentUser.getIdToken()
    
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }
   
    data = { 
      value: amount,
      pix_account: pix_account,
      price: price, 
      code: code,
      identifier: identifier
    }
    // console.log(JSON.stringify(data))
    return await api.post('/transactions/withdraw', data, config)
  }