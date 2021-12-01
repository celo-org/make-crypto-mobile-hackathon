//Importações Externas 
import React from "react"; 
import { FlatList, View } from 'react-native';  

//Importações Internas   
import PaymentAction from '../../components/PaymentAction';  

const actions = [ 
  {id: 'contas_e_boletos', titulo: 'Pagar contas e boletos', icon: 'barcode-outline', url: 'ValidateEmail', status: 1},
  {id: 'recibos', titulo: 'Recibos', icon: 'receipt-outline', url: 'Withdraw', status: 1},
  {id: 'recargas', titulo: 'Recargas', icon: 'phone-portrait-outline', url: 'Withdraw', status: 1},
  {id: 'pontos', titulo: 'Pontos', icon: 'flash-outline', url: 'Withdraw', status: 1},
  {id: 'pagar_QR', titulo: 'Pagar via QR', icon: 'qr-code-outline', url: 'Withdraw', status: 1}, 
  {id: 'gift_card', titulo: 'Gift Cards', icon: 'gift-outline', url: 'Withdraw', status: 1}, 
  {id: 'cashback', titulo: 'Cashback', icon: 'sync-outline', url: 'Withdraw', status: 1}, 
  {id: 'investimentos', titulo: 'Investimentos', icon: 'trending-up-outline', url: 'Withdraw', status: 1}, 
  {id: 'cupons', titulo: 'Cupons de Desconto', icon: 'pricetags-outline', url: 'Withdraw', status: 1}, 
]

const renderItem = ({ item, index }) => (
  <PaymentAction key = {index} id = {`servicos_${item.id}`} title = {item.titulo} icon = {item.icon} url = {item.url} status = {item.status} style = {{marginBottom: 4, marginRight: 4, borderColor: 'white'}}/>
);
 
const Servicos = () => {  
  return (
     <View style = {{backgroundColor: 'white', padding: 8, alignItems: 'center',}}>  
        <FlatList
          data={actions} 
          renderItem={renderItem}  
          horizontal={false}
          numColumns={4}/> 
      </View> 
  );
}
 
export default Servicos; 