//Importações Externas 
import React, { useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { StyleSheet, ScrollView } from 'react-native'; 
import { useSelector, useDispatch } from 'react-redux';
//Importações Internas 
import { ScrollCard } from './scrollCard';
import { setEmailVerified} from '../store/actions/user';

const cardsData = [ 
  {
    id: 'indique',
    title: 'Indique um amigo',  
    mainColor: '#673AB7',
    icon: 'share',
    url: 'ShareApp',
    local: true, 
  },
  {
    id: 'visite_perfil',
    title: 'Visite nosso perfil no Instagram', 
    mainColor: '#3F51B5',
    icon: 'instagram',
    url: 'https://www.instagram.com/lovecryptobr/',
    local: false, 
  },
  {
    id: 'sugira_funcoes',
    title: 'Sugira novas funções para o App',  
    mainColor: '#2196F3',
    icon: 'inbox',
    url: 'https://airtable.com/shrCo7XDsRuRpD0Ts',
    local: false, 
  }, 
  {
    id: 'reporte_bug',
    title: 'Reporte um bug',  
    mainColor: '#2196F3',
    icon: 'bug',
    url: 'https://airtable.com/shrUnjFwuuSGwsRfv',
    local: false, 
  }, 
]


// Outras cores
//  https://flatuicolors.com/palette/au

export const ScrollCardRow = (props) => { 
  const user = useSelector(state => state.userState); 
  
  const dispatch = useDispatch();
 
  useEffect(() => {
    if(auth().currentUser != null){
      if(auth().currentUser.emailVerified){
        dispatch(setEmailVerified())
      }
    }
    }, []);

  return (
    <ScrollView horizontal={true}   showsHorizontalScrollIndicator={false} style = {{marginRight: 16}} fadingEdgeLength = {100}>
      { !user.phoneVerified &&
        <ScrollCard navigation = {props.navigation} id = {'confirme_numero'} title = {'Confirme seu número de telefone'} mainColor = {'#f44336'} icon = {'phone'} url = {'ValidatePhone'} local = {true} index = {0}/>
      }
      { !user.emailVerified &&  
        <ScrollCard navigation = {props.navigation} id = {'confirme_email'}  title = {'Confirme seu email'} mainColor = {'#E91E63'} icon = {'inbox'} url = {'ValidateEmail'} local = {true} index = {1}/>
      }
      {/* { !user.documentsVerified &&
        <ScrollCard navigation = {props.navigation} title = {'Verifique sua identidade'} mainColor = {'#f44336'} icon = {'address-card'} url = {'VerifyIdentity'} local = {true} index = {2}/>
      } */}
      {/* { auth.pin == null &&
        <ScrollCard navigation = {props.navigation} title = {'Crie seu pin'} mainColor = {'#f44336'} icon = {'th'} url = {'Pin'} local = {true} index = {3}/>
      } */}
     
      { !user.photoUrl == null &&  
        <ScrollCard navigation = {props.navigation} id = {'adicione_foto'}  title = {'Adicione uma foto de perfil'} mainColor = {'#9C27B0'} icon = {'user'} url = {'Detail'} local = {true} index = {4} />
      }
      { 
        cardsData.map((cardInfo, index) =>(
          <ScrollCard key = {index} navigation = {props.navigation} id = {cardInfo.id}   title = {cardInfo.title} mainColor = {cardInfo.mainColor} icon = {cardInfo.icon} url = {cardInfo.url} local = {cardInfo.local} index = {5 + index}/>
        )) 
      } 
    </ScrollView>
  );
}
 

const styles = StyleSheet.create({
  card: {
      flexDirection: 'row',
      padding: 24, 
      borderRadius: 10, 
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'red',
      width: 100,
      height: 150,
 
  },
  input:{
      marginTop: 16,
  }
});