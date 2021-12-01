//Importações Externas
import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '@ui-kitten/components'; 

//Importações Internas
import { ProfileOption } from './profileoption';
 
const pixTypes = [
    {
      typeTitle: 'Celular',
      type: 'phone',
      icon: 'phone-outline'
      
    },
    {
      typeTitle: 'Email',
      type: 'email',
      icon: 'email-outline'
    },
    {
      typeTitle: 'CPF/CNPJ',
      type: 'cpf_cnpj',
      icon: 'card-account-details-outline'
    },
    {
      typeTitle: 'Chave Aleatória',
      type: 'randomkey',
      icon: 'key-outline'
    }, 
  ] 


  const cryptoTypes = [
    // {
    //   typeTitle: 'Celo Gold',
    //   type: 'CELO',
    //   logo: 'celoDollar.png'
      
    // },
    {
      typeTitle: 'Celo USD',
      type: 'CUSD',
      logo: 'cusd.png'
    },
  ] 
 
export const AccountTypes = props => {  
    const wallet = useSelector(state => state.withdrawState); 
  
    const jumpTo = (type, variant) => {
      let target = null;
      if(type == 'fiat'){
        switch (variant){
          case 'phone':
            if(wallet.fiatWallet.phone != null){
              target = 'Requestwithdraw'; 
            }else{
              target = 'Addaccount';
            }
            break; 
          case 'email':
            if(wallet.fiatWallet.email != null){
              target = 'Requestwithdraw'; 
            }else{
              target = 'Addaccount';
            }
            break;  
          case 'cpf_cnpj':
            if(wallet.fiatWallet.cpf_cnpj != null){
              target = 'Requestwithdraw'; 
            }else{
              target = 'Addaccount';
            }
            break;  
          case 'randomkey':
            if(wallet.fiatWallet.randomkey != null){
              target = 'Requestwithdraw'; 
            }else{
              target = 'Addaccount';
            }
            break;  
        }
          
      }else{
          if(wallet.cryptoWallet == variant){
            target = 'Requestwithdraw'; 
          }else{
            target = 'Addaccount';
          }
      }  

      return target
  }

    return(
        <Layout style = {{width: '100%'}}>
            {props.actionType == 'crypto' ?
                cryptoTypes.map(type =>{
                  const target = jumpTo('crypto', type.type)
                  // console.log("TARGET " + type.type)
                  return(
                    <ProfileOption key = {type.typeTitle} route = {target} title = {type.typeTitle} type = {type.type} logo = {type.logo} navigation = {props.navigation} routeData = {{type: 'crypto', variant: type.type}}/>
                )})
            : 
                pixTypes.map(type =>{
                  const target = jumpTo('fiat', type.type)
                  // console.log("TARGET " + target)
                  return(
                    <ProfileOption key = {type.typeTitle} route = {target} title = {type.typeTitle} icon = {type.icon} navigation = {props.navigation} routeData = {{type: 'fiat', variant: type.type}}/>
                  )
                }
                ) 
            }
           </Layout>
    )
}