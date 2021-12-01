//Importações Externas
import React from 'react';
import moment from 'moment';
import { MomentDateService } from '@ui-kitten/moment';
import { View, TouchableNativeFeedback } from 'react-native';
import { Layout, useTheme, Text } from '@ui-kitten/components'; 
 
//Importações Internas
import { round } from '../../shared/roundNumbers' ;
import { multiplier, minimoPontosConversivel } from '../../shared/constants'; 
const Registro = (props) => { 
  
  const theme = useTheme();

  let status = null;
   
  let titulo = null
  let value = 0
  let price = null;
  switch (props.titulo) {
    case 'RECOMMENDATION':
      titulo = 'Recomendação'
      break;
    case 'TASK':
      titulo = 'Recompensa de tarefa' 
      value = round(props.valor_cUSD / multiplier, 2).toFixed(2)
      status = 'success'
    case 'CONVERSION':
      titulo = 'Conversão de pontos'
      value = (props.points / minimoPontosConversivel).toFixed(2);
      status = 'success';
      break;
    case 'WALLET':
      titulo = 'Saque'
      price = props.withdraw != null ? props.withdraw.total : null;
      value = props.withdraw != null ? parseFloat(props.withdraw.value).toFixed(2) : round( props.valor_cUSD / multiplier, 2).toFixed(2)
      status = 'danger'
      break;
    case 'PROMOTION':
      titulo = 'Código promocional'
      break;
    default:
      titulo = 'NOT FOUND'
      break;
  }
  return (
    <TouchableNativeFeedback>
      <Layout style = {{flexDirection: 'row', justifyContent: 'space-between',width: '100%'}}>
        <View style = {{paddingHorizontal: 16,}}>
          <View style = {{height: 14, width: 2, backgroundColor: props.index == 0 ? 'white' : '#ccc' , marginLeft: 'auto', marginRight: 'auto'}}></View>
          <View style = {{height: 16, width: 16, borderRadius: 8, borderColor: theme[`color-${status}-default`], borderWidth: 3, }}></View>
          <View style = {{height: 10, width: 2, backgroundColor: '#ccc', marginLeft: 'auto', marginRight: 'auto', flex: 1, }}></View> 
        </View>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingVertical: 8, paddingRight: 16, paddingBottom: 16}}>
          <View>
            <Text category='s1' style = {{fontWeight: 'bold'}}>{titulo}</Text>
            <Text category='s2' appearance = 'hint' category='s2'>{moment(props.data).format('DD/MM/YYYY - HH:mm')}</Text>
          </View>
          <View>
            <Text category='s1' status = {status} style = {{textAlign: 'right', fontWeight: 'bold'}}>{status == 'success' ? '+' : '-'} {value} cUSD</Text>
            {price != null &&
              <Text category='s2' appearance = 'hint' style = {{textAlign: 'right'}}>R$ {parseFloat(price).toFixed(2)}</Text>
            }
          </View> 
        </View>
      </Layout>
    </TouchableNativeFeedback>
  );
};

export default Registro;
