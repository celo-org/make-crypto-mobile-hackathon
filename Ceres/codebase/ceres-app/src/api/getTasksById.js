import { api } from './'
import auth from '@react-native-firebase/auth';
 
export const getTasksById = async (id) => {
  tasks = null;
  token = await auth().currentUser.getIdToken()
  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try{
    await api.get('/tasks/'+id, config).then( response => {
     tasks = response.data
  });
  }catch ( error ) {
    console.log(error.message)
  }
  return tasks
}