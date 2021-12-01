//Importações Externas 
import React from "react"; 
import { ScrollView } from 'react-native';  

//Importações Internas  
import PaymentAction from './PaymentAction'; 
   
const actions = [
  {id: 'sacar', titulo: 'Sacar', icon: 'arrow-up-outline', url: 'Withdraw', status: 0},
  {id: 'receber', titulo: 'Receber', icon: 'arrow-down-outline', url: 'ValidateEmail', status: 1},
  {id: 'contas_e_boletos', titulo: 'Pagar contas e boletos', icon: 'barcode-outline', url: 'ValidateEmail', status: 1},
  {id: 'recibos', titulo: 'Recibos', icon: 'receipt-outline', url: 'Withdraw', status: 1},
  {id: 'recargas', titulo: 'Recargas', icon: 'phone-portrait-outline', url: 'Withdraw', status: 1},
  {id: 'pontos', titulo: 'Pontos', icon: 'flash-outline', url: 'Withdraw', status: 1},
  {id: 'pagar_QR', titulo: 'Pagar via QR', icon: 'qr-code-outline', url: 'Withdraw', status: 1}, 
]

const PaymentActionsRow = () => { 
   
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style = {{marginLeft: 16, marginTop: 16}} fadingEdgeLength = {100} > 
      {actions.map((item, index) =>(
          <PaymentAction key = {index} id = {`pagamentos_${item.id}`} title = {item.titulo} icon = {item.icon} url = {item.url} status = {item.status}/>
      ))} 
    </ScrollView>
  );
}
 
export default PaymentActionsRow; 