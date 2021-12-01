//Importações Externas 
import React from "react"; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import { Avatar, Layout, Text, useTheme} from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

//Importações Internas
import { logEvent } from '../shared/analyticsLog'; 
import * as NavigationService from '../navigation/NavigationService'; 
 

Icon.loadFont()
 
const PaymentAction = (props) => {
 
  const theme = useTheme(); 
  
  const pressAction = () => {
    logEvent(props.id)
    if(props.status != 1 && props.status != 2){
      NavigationService.navigate(props.url, props.additionalData)
    }
  }
 
  return ( 
    <TouchableOpacity onPress={() => pressAction()}>  
      <Layout style = {[styles.card, props.style]}> 
        {props.status == 1 &&
          <View style = {{backgroundColor: theme['color-info-500'], padding: 4, paddingHorizontal: 8, borderRadius: 8, position: 'absolute', top: 4, right: 4, zIndex: 1}}>
            <Text category = 'c2' appearance = 'alternative'>em breve</Text>
          </View> 
        }
        {props.status == 2 &&
        <View style = {{backgroundColor: theme['color-warning-500'], padding: 4, paddingHorizontal: 8, borderRadius: 8, position: 'absolute', top: 4, right: 24, zIndex: 1}}>
          <Text category = 'c2'>novo</Text>
        </View> 
      }  
        {props.imageIcon == null ?
        <View style = {[{backgroundColor: theme['color-primary-default']}, styles.avatar]}>
          <Icon color = 'white' size = {20} name={props.icon}/>
        </View>:
        <View style = {styles.avatar}>
          <Avatar source = {{uri:props.imageIcon}} style = {{height: 40, width: 40}}/>
        </View>
        }
        <View style = {styles.textBox}>
          <Text category = 'c2' status = 'primary' style = {{fontWeight: 'bold', textAlign: 'center'}}>{props.title} </Text>
        </View> 
      </Layout> 
    </TouchableOpacity> 
  );
}

export default PaymentAction;
  
const styles = StyleSheet.create({
  card: { 
    width: 90,
    height: 120,
    marginRight: 16,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 24, 
    borderColor: '#ccc', 
    paddingHorizontal: 8, 
    alignItems: 'center',  
    backgroundColor: 'white',
  }, 
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center', 
    justifyContent:'center',
  },
  textBox: {
    height: 100, 
    paddingTop: 8,
  },
  closeButton: {
    left: 0,
    bottom: 0,
    zIndex: 1, 
    position: 'absolute',
  }
});