//Importações Externas
import { Toast } from './PopUp'
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
//import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Layout, Text, Button, useTheme} from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity, Linking} from 'react-native';

//Importações Internas 
import { emailConfirmation } from '../api/emailConfirmation';  
import { Alert } from './alert';

export const VerificationStatus = (props) => {
 
  const theme = useTheme();
  const user = useSelector(state => state.userState);
  const steps = 3;
  const [completed, setCompleted] = useState(0);

  const [visible, setVisible] = useState(true)

  let counter = 0;

  useEffect(() =>{

    setCompleted(0)

    if(user.phoneVerified){
      counter++ 
    } 

    if(user.emailVerified){
      counter++
    }

    if(user.documentsVerified){
      counter++
    }

    setCompleted(counter)

    // alert(`${steps} === ${counter} | ${steps === counter}` )

    setVisible(!(steps === counter))
      
   
  }, [counter, user.emailVerified, user.phoneVerified])
 

  const pressAction = () => {
    props.navigation.navigate('VefifiedStatus') 
  }
  
  return ( 
    <TouchableOpacity onPress={() => pressAction()}>
    {visible && 
    <View style = {props.style}>  
      <Layout style = {styles.card}>
        <Button size = {'small'} appearance = 'ghost' status = 'basic' style = {styles.closeButton} onPress = {() => setVisible(false)}>x</Button> 
        <View style = {{flex: 1 }}>
          <Text category = 's1' style = {{fontWeight: 'bold'}}>Status de verificação de perfil</Text> 
        </View>
        <View>
          <Text category = 's2' appearance = 'hint' style = {{fontWeight: 'bold'}}>{`${completed} de ${steps} concluido`}</Text> 
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
            {[...Array(steps)].map((e, i) => <View key = {i} style = {[styles.step, {width: `${97 / steps}%`, backgroundColor: i < completed ? theme['color-success-default']: '#eee'}]}></View>)} 
          </View>
        </View> 
      </Layout>
    </View>}
    </TouchableOpacity>
 
  );
}
  
const styles = StyleSheet.create({
  card: { 
      padding: 16, 
      borderRadius: 10,   
      backgroundColor: 'white',
      width: '100%',
      height: 100, 
      borderWidth: 0.5,
      borderColor: 'grey',
      justifyContent: 'space-between' 
  },
  cardContent: {
    alignItems: 'center', 
   
  },
  input:{
      marginTop: 16,
  },
   
  textBox: {
    paddingTop: 8,
    height: 100, 
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  step: {
    width: 50,
    height: 8,
    borderRadius: 4,
    // backgroundColor: '#eee'
  }
});