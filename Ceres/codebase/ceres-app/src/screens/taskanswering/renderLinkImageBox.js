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
  


const renderLinkImageBox = (questionText, url_link) => {

     
    const [photo, setPhoto] =  React.useState(null)
    var clickLink = false;
  
    const openLink = (url) => {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err)); 
      clickLink = true;
    };
  
  
    const handleChoosePhoto = () => {
      const options = {
        noData: false,
        base64: true
        // title: 'Selecione a captura de tela'
      }
      ImagePicker.launchImageLibrary(options, response => { 
        // const base64Value = response.data;
        if (response.uri) {
         
          let source = 'data:image/jpeg;base64,' + response.data
          
          setPhoto(response.uri)
         
           
        }
      })
    }
  
    return (
      <Layout style={styles.infoTextContainer}>
        <Text category = 's1' style = {{ marginLeft: 10,}}>{questionText}</Text>
        {
          !clickLink &&
          <Layout style = {{marginTop: 48}}>
            <Text category = 's1' style = {{ marginLeft: 10,}}>Acesse o link</Text>
            <Button style={styles.button} appearance='ghost' size = 'large' style = {{marginTop: 24}} onPress={() => {openLink(url_link); }} accessoryRight={() =><Icon name={'external-link'} size={20} color={'#9807F9'} />}>
              Abrir Link
            </Button>  
          </Layout>
        }
        {
          clickLink &&
          <Layout  style = {{marginTop: 48}}>
            <Text category = 's1' style = {{ marginLeft: 10,}}>{questionText}</Text>  
            <Image style = {{width: 300, height: 200, alignSelf: 'center', marginTop: 24 }} source={{uri: this.state.photo == null ? 'https://reactnative.dev/img/tiny_logo.png' :  this.state.photo}}/>  
            <Button style={styles.button} appearance='ghost'  style = {{marginTop: 24}} onPress={ () => handleChoosePhoto()}>
              Fazer Upload de imagem
            </Button> 
          </Layout>
        }
       
      </Layout>
    );
  }






const Social = (props) => {
 
  return (
    <Layout style = {{marginTop: 24, alignItems: 'center'}}>
      <Text style={styles.text} category='s1'>Confira as redes sociais da Ceres!</Text>
      <Layout style={styles.container} level='1'>   
        {
          data.map(social =>(
            <Button style = {styles.button} size = 'small' appearance = 'ghost' status='danger' onPress = {() => openSocial(social.url)} accessoryLeft={() => socialIcon(social.icon, social.color)}/>
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

export default renderLinkImageBox;