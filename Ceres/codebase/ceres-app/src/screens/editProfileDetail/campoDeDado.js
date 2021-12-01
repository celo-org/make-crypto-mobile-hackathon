//Importações Externas
import {
  Button,
  Input,
  Layout,
  Datepicker,
  Icon,
  NativeDateService,
  IndexPath,  
  Text,
  Select, 
  SelectItem,
  useTheme,
} from '@ui-kitten/components';
import * as Yup from 'yup';
 
import React  from "react"; 
import { EditCPF } from './editCPF';
import { EditPhone } from './editPhone';
import { EditCidade } from './editCidade';


const editCPF = () => {

  const validationSchema = Yup.object().shape({ 
    cpf: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Insira apenas os digitos, sem pontos e traços').nullable(),
  })
  

  return(
    <Layout style = {{paddingHorizontal: 16, paddingVertical: 24}}>
      <Text>{`Dado ${props.type}`}</Text>
    </Layout>
  )
}



export const CampoDeDado = (props) => {

  const theme = useTheme();
 
  switch (props.type) {
    case 'cpf':
      return <EditCPF/>
    case 'phone':
      return <EditPhone/>
    case 'address.city':
      return <EditCidade/>
    default:
      return(
        <Layout style = {{paddingHorizontal: 16, paddingVertical: 24}}>
          <Text>{`Dado ${props.type}`}</Text>
        </Layout>
       )
  }

 
 
};