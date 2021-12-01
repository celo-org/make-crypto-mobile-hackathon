//Importações Externas
import React, { useContext } from "react";
import { Layout, Button, Text} from '@ui-kitten/components'
import { View } from 'react-native'
//Importações Internas
import { StyleSheet,  Linking,  } from 'react-native';
 
import Icon from 'react-native-vector-icons/FontAwesome'; 
Icon.loadFont();
const openSocial = (link) => { 
  Linking.openURL(link).catch(err => console.error("Couldn't load page", err)); 
};
 
const socialIcon = (name, color) => ( 
  <Icon name={name} size={30} color={color} />
);
 
const data  = [
  {
    name: 'Facebook',
    icon: 'facebook',
    url: 'https://www.facebook.com/lovecryptobr/',
    color: '#1877f2',
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/lovecryptobr/',
    color: '#dd2a7b',
  },
  {
    name: 'Twitter',
    icon: 'twitter',
    url: 'https://www.twitter.com/lovecryptobr/',
    color: '#08a0e9',
  },
]

const Social = (props) => {
 
  return (
    <Layout style = {{marginTop: 24, alignItems: 'center'}}>
      <Text style={styles.text} category='s1'>Confira as redes sociais da Ceres!</Text>
      <Layout style={styles.container} level='1'>   
        {
          data.map(social =>(
            <Button key = {social.name} style = {styles.button} size = 'small' appearance = 'ghost' status='danger' onPress = {() => openSocial(social.url)} accessoryLeft={() => socialIcon(social.icon, social.color)}/>
          )) 
        } 
      </Layout>
    </Layout>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',

  },
  button: {
    margin: 10,
  },
});

export default Social;