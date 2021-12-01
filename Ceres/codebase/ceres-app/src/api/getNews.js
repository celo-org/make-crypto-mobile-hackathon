import { api } from './'  
import auth from '@react-native-firebase/auth';
 
const getNews = async () =>{
   
  token = await auth().currentUser.getIdToken()
  
  config = {
    headers: { Authorization: `Bearer ${token}` }
  } 
 
  // return await newsApi.get(`everything?q=criptomoedas&sortBy=publishedAt&language=pt&apiKey=${newsAPIKey}`) l
  return await api.get(`/news`, config) 
  
}

export default getNews;