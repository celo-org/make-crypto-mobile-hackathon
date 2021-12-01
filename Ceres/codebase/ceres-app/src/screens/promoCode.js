//Importações Externas
import React, { useState } from 'react';
import { useTheme, Layout } from '@ui-kitten/components';
import { Animated, SafeAreaView, ScrollView, StyleSheet,}  from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

//Importações Internas
// import {LocalizationContext} from '../locales';
import { ThemeContext } from '../../theme-context'; 
import { HeroHeader } from '../components/heroHeader';
import { PromoCode } from '../components/promoCode';
import { TopNavigationHeader } from '../shared/topNavigation';
import { generalStyle } from '../shared/generalStyle';
import { CustomHeader } from '../shared/customHeader';
import HeaderParallax from '../components/headerParallax';

const RenderContent = () => {
    return (
        <Layout style = { styles.card}>
            <PromoCode/>
        </Layout>
    )
}

export const PromoCodeScreen = (props) => {

    //Tradução
    // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    //initializeAppLanguage(); //

    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    const theme = useTheme();

    const [scrollY] = useState(new Animated.Value(0))

    let bgImage = require('../assets/images/terms_bg.jpg')
  

    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}>
                <HeaderParallax  title = {'Código promocional'} bg = {bgImage} scrollY = {scrollY}/>
                <ScrollView onScroll = {e => { scrollY.setValue(e.nativeEvent.contentOffset.y)}} > 
                    <RenderContent/>
                </ScrollView>
            {/* <ReactNativeParallaxHeader
                headerMinHeight={56}
                headerMaxHeight={220}
                extraScrollHeight={20}
                navbarColor= {theme['color-primary-default']}
                backgroundImage={require('../assets/images/promo_code_bg.jpg')}
                renderNavBar={() => <CustomHeader navigation = {props.navigation} title = {'Código Promocional'}/>}
                renderContent={renderContent}
            /> */}
        </SafeAreaView>
    )
};
  
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 24, 
        borderRadius: 10, 
        justifyContent: 'space-around',
        alignItems: 'center',
        top: -10,
        marginBottom: -10,
    },
    input:{
        marginTop: 16,
    }
  });