import { api } from './'
import auth from '@react-native-firebase/auth';
 
export const sendTaskApi = async (id, answers) => {
  token = await auth().currentUser.getIdToken()

  config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  console.log('task_id: ' + id + ",  answers: " + JSON.stringify(answers))
  let data =  {task_id: id, answers: answers} 
  return await api.post('/tasks/response', data, config)
}