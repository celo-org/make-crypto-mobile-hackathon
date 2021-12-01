import React, { Fragment } from "react";
import { StyleSheet, ImageBackground } from 'react-native'
import { Layout, Text} from '@ui-kitten/components';

//Serve como titulo de seção pelo app
export const SectionBanner = ({type}) => {
 
    let BG = null
    switch (type) {
        case 'privacy':
            BG = <ImageBackground  source={require('../assets/images/privacy_bg.jpg')} style={styles.sectionBanner}/>
            break;
        case 'mydata':
            BG = <ImageBackground  source={require('../assets/images/mydata_bg.jpg')} style={styles.sectionBanner}/>
            break;
        case 'terms':
            BG = <ImageBackground  source={require('../assets/images/terms_bg.jpg')} style={styles.sectionBanner}/>
            break;
        case 'info':
            BG = <ImageBackground  source={require('../assets/images/info_bg.jpg')} style={styles.sectionBanner}/>
            break;
        default:
            BG = <ImageBackground  source={require('../assets/images/mydata_bg.jpg')} style={styles.sectionBanner}/>
      }
      
    return (
        BG
    );
}
const styles = StyleSheet.create({
    sectionBanner:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 150,
      },
})