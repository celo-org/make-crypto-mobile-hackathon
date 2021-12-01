//Importações Externas
import { 
  Text,
  useTheme, 
} from '@ui-kitten/components'; 
import React from 'react'; 
import { StyleSheet, View, Image, TouchableNativeFeedback} from 'react-native';  

//Importações Externas
import { logEvent } from '../shared/analyticsLog'

const PaymentCard = (props) => {

  const theme = useTheme(); 
  
  const converter = async () => {
    logEvent('pagar_via_QR_Code_Principal')
  };
   
  return( 
    <TouchableNativeFeedback onPress = {converter}>
 
         
      <View style = {[styles.card, {backgroundColor: theme['color-success-600']}]}>
        <View style = {{backgroundColor: theme['color-info-500'], padding: 4, paddingHorizontal: 8, borderRadius: 8, position: 'absolute', top: 4, right: 4, zIndex: 1}}>
          <Text category = 'c2' appearance = 'alternative'>em breve</Text>
        </View> 
        <View style = {{width: '30%'}}>
          <Image source = {require('../assets/images/qr-code.png')} style = {{height: 64, width: 64}}/>
        </View>
        <View style = {{width: '70%', alignItens: 'center', justifyContent: 'center',  }}>
          <Text category='s1'  appearance = 'alternative' style = {{textAlign: 'center', fontWeight: 'bold'}}>Pagamento via QR code</Text>
        </View>  
      </View> 
    </TouchableNativeFeedback>
  )
};

export default PaymentCard;
  
const styles = StyleSheet.create({
  card: {
    flex: 1, 
    padding: 16,
    paddingHorizontal: 24, 
    marginTop: 8,
    width: '100%', 
    borderRadius: 10, 
    backgroundColor: '#ffffff33', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  }
});