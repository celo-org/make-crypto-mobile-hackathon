//Importações Externas
import React, { useContext } from 'react';
import { Layout } from '@ui-kitten/components';
import { generalStyle } from '../shared/generalStyle'

//Importações Internas
import { ProfileOption } from './profileoption';
import { LocalizationContext } from '../locales';
 

//Serve como titulo de seção pelo app
export const ProfileMenu = props => {

    // const { translations } = useContext(LocalizationContext);
    
    return (
        <Layout style = {generalStyle.cardSection}>
            <ProfileOption route ='Detail' title = {'Editar Perfil'} icon = {'account-edit-outline'} navigation = { props.navigation}/>
            <ProfileOption route ='Settings' title = {'Configurações'} icon = {'cog-outline'} navigation = { props.navigation}/> 
            <ProfileOption route ='Pin' title = {'Pin'} icon = {'dialpad'} navigation = { props.navigation}/>
            <ProfileOption route ='ShareApp' title = {'Indique e Ganhe'} icon = {'share-outline'} navigation = { props.navigation}/>
            <ProfileOption route ='PromoCode' title = {'Código promocional'} icon = {'gift-outline'} navigation = { props.navigation}/>
            <ProfileOption route ='Legal' title = {'Legal'} icon = {'file-outline'} navigation = { props.navigation}/>   
            <ProfileOption route ='Suport' title = {'Ajuda'} icon = {'information-outline'} navigation = { props.navigation}/>
        </Layout> 
    );
}
 
