//Importações Externas
import { api } from './';
 
 
export const getMinimumVersion = async () => {
  user = null;
    
  return await api.get('/core/release' )
}