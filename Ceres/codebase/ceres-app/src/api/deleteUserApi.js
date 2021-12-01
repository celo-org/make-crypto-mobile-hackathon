import { api } from './'
import auth from '@react-native-firebase/auth';
 
export const deleteUserApi = async (id) => {
    
    token = await auth().currentUser.getIdToken()
    
    config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try{
        await api.delete('/user/delete/' + id, config).then(() => {
            console.log('usuario deletado da api')
        });
    }catch ( error ) {
        console.log(error.message)
    }
}