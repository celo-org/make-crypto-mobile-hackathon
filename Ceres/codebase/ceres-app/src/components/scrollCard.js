//Importações Externas
import { Toast } from './PopUp'
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Layout, Text, Button, useTheme} from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity, Linking} from 'react-native';

//Importações Internas 
import { logEvent } from '../shared/analyticsLog';
import { emailConfirmation } from '../api/emailConfirmation';  

export const ScrollCard = (props) => {
 
  const theme = useTheme();
  const user = useSelector(state => state.userState);
  const [visible, setVisible] = useState(true)

  const colors = [
    '#f44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',  
  ]
  
  const pressAction = () => {
    logEvent(`acoes_card_${props.id}`)
    if(props.type == 'email'){
      props.navigation.navigate('ValidateEmail')
      // emailConfirmation().then(() => {
      //   Toast.show({
      //     title: 'Email enviado',
      //     text: `Email de verificação enviado para sua caixa de entrada, cheque também a caixa de SPAM do email ${user.email}`,
      //     color: theme['color-info-default']
      //   })
      // })
    }else if(props.local && props.url != null){
      props.navigation.navigate(props.url)
    }else{
      Linking.openURL(props.url).catch(err => {
        console.error("Couldn't load page", err)
      })
    }
       
  }

  return ( 
    <TouchableOpacity
      onPress={() => pressAction()}
    
    >
      {visible &&
    // {backgroundColor: props.bgColor}
    <Layout style = {[ {borderBottomColor: colors[props.index], borderTopColor: colors[props.index]}, styles.card,]}>
      <Button size = {'small'} appearance = 'ghost' status = 'basic' style = {styles.closeButton} onPress = {() => setVisible(false)}>x</Button>
      <View style = {styles.cardContent}>
        <View style = {styles.textBox}>
          <Text category = 's1' style = {{fontWeight: 'bold'}}>{`${props.title.slice(0, 32)} ${props.title.length > 32 ? ' ...' : '' }`} </Text>
        </View>
        <View style = {[{backgroundColor:  colors[props.index]}, styles.avatar]}>
          <Icon name={props.icon} size={20} color={'white'} />  
        </View>
      </View>
    </Layout>
}
  </TouchableOpacity>
 
  );
}
 

const styles = StyleSheet.create({
  card: { 
      padding: 16, 
      borderRadius: 5,   
      backgroundColor: 'white',
      width: 120,
      height: 190,
      marginLeft: 16,
      // marginTop: 8,
      marginBottom: 16, 
      marginTop: 8,
      // shadowColor: "grey",
      // shadowOffset: {
      //     width: 0,
      //     height: 5,
      // },
      // shadowOpacity: 0.34,
      // shadowRadius: 6.27,
      // elevation: 5,
      borderWidth: 0.5,
      borderColor: 'grey',
      // borderBottomColor:'red',
      borderBottomWidth: 3, 
      borderTopWidth: 3, 
 
  },
  cardContent: {
    alignItems: 'center', 
   
  },
  input:{
      marginTop: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent:'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  textBox: {
    paddingTop: 8,
    height: 100, 
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
});