//Importações Externas 
import React from "react"; 
import { Text } from '@ui-kitten/components';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Linking } from 'react-native';

//Importações Internas
import { logEvent } from '../shared/analyticsLog';
import { ScrollView } from "react-native-gesture-handler";

const data = [
  {
    id: 'acesse_telegram',
    title: 'Acesse nosso grupo\nno Telegram',
    description: 'Participe da comunidade',
    image_url: 'telegram.png',
    url: 'https://t.me/joinchat/rKDE-KbJQR0xN2Nh', 
  },
  {
    id: 'matenha_dados_atualizados',
    title: 'Mantenha seus \ndados atualizados',
    description: null,
    image_url: 'testBanner.png',
    url: null, 
  },
 
]

const Banner = (props) =>{

  const pressAction = (url) => {
    if(url){
      Linking.openURL(url)
    }
    console.log(props.id)
    // logEvent(props.id)
  }

  return ( 
     
    <View style = {{width: 340, height: 100, borderRadius: 10, marginRight: 16,}}>
      <TouchableOpacity onPress={() => pressAction(props.url)}>
        <ImageBackground source={require(`../assets/images/telegram.png`)} style  = {{width: 340, height: 100, paddingVertical: 16, paddingHorizontal: 24}} imageStyle={{ borderRadius: 8}}>
          <Text category = 's1' status = 'control' style = {{fontWeight: 'bold'}}>{props.title}</Text>
          <Text category = 's2' status = 'control' >{props.description}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
   
  );
}


const MainBanner = (props) => { 
  return ( 
    <View style = {{flex: 1, paddingTop: 16, paddingLeft: 16}}> 
      <ScrollView horizontal={true} pagingEnabled showsHorizontalScrollIndicator={false}>
        {data.map((banner, index) =>{
          return( 
              <Banner key = {banner.id} title = {banner.title} description = {banner.description} image_url = {banner.image_url} url = {banner.url}/> 
            )
          })}
      </ScrollView>
    </View>
 
  );
}
 
export default MainBanner;

const styles = StyleSheet.create({
  banner: { 
      // padding: 16, 
      borderRadius: 10,   
      backgroundColor: 'white',
       
      height: 100,
       
      width: '100%',
      // marginTop: 8,

    
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
     
 
  },
   
});