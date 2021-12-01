//Importações Externas
import React from 'react'; 
import { ScrollView } from 'react-native';
import { useTheme } from '@ui-kitten/components'; 
import * as Animatable from 'react-native-animatable'; 
import LinearGradient from 'react-native-linear-gradient';

//Importações Internas 
import Balance from './balance';
import PaymentCard from '../../components/paymentCard'; 
import PointsCard from './pointsCard';  

//Hero banner com saldo e pontos do usuário
const HeaderWallet = (props) => { 
  const theme = useTheme(); 

  return (
    <LinearGradient colors={[ theme['color-primary-600'], theme['color-info-300']]}  style = {{padding: 16}}> 
      {/* <ScrollView horizontal={true} pagingEnabled showsHorizontalScrollIndicator={false}>
        <Balance navigation = {props.navigation}/>
        <PointsCard navigation = {props.navigation}/>
      </ScrollView> */}
      <Animatable.View animation="fadeIn" duration = {3000}>
        <Balance navigation = {props.navigation}/>
      </Animatable.View>
      <Animatable.View animation="slideInUp" duration = {2000} style = {{marginTop: 16}}>
        <PointsCard navigation = {props.navigation}/>
      </Animatable.View>
      {/* <Animatable.View animation="slideInUp" duration = {3000} style = {{padding: 16}}>
        <PaymentCard navigation = {props.navigation}/>
      </Animatable.View> */}
    </LinearGradient>
  );
}

export default HeaderWallet;