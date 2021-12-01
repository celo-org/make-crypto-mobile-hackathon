//Importações Externas
import React from "react";
import { Image, View } from 'react-native'
import { useTheme } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';

//Logo da lovecrypto nas escalas necessarias
export const LovecryptoLogo = ({size}) => {

    const small = ( size == 'small' ? true : false )
    const theme = useTheme();

    const logo = require ('../assets/images/logo_white.png');
    const watermark = require ('../assets/images/watermark.png');
    

    return ( 
        <View  style={{width: '100%', padding: small? 24 : 48, justifyContent: 'center', alignItems: 'center', backgroundColor: theme['color-primary-default'] }} >
            <Animatable.View  animation="bounceIn"  duration = {1000} >
                <Image style = {{height: small ? 32 : 16, width: small ? 66 : 66, alignSelf: 'center'}} source = {logo}/>
                <Image style = {{height: 269.55, width: 289, marginBottom: -150}} source = {require ('../assets/images/watermark.png')}/>
                
            </Animatable.View>
        </View>
    );
}
 