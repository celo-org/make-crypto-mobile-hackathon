//Importações Externas
import React, { useState } from "react";
import { Animated, ImageBackground, StyleSheet, View } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";

//Importações Internas
import { TopNavigationHeader } from "../shared/topNavigation";

//Serve como titulo de seção pelo app
const HeaderParallax = (props) => {
      
    const [scrollY] = useState(new Animated.Value(0))

    let changingHeight = scrollY.interpolate({
        inputRange: [0, 180, 360],
        outputRange: [200, 100, 60],
        extrapolate: 'clamp',  
    })
 
    let opacityText = scrollY.interpolate({
        inputRange: [0, 100, 200],
        outputRange: [1, 0.1, 0],
        extrapolate: 'clamp',  
    }) 

    return (
        <>
            <Animated.View style={[styles.header, {height: changingHeight,}]}> 
                <TopNavigationHeader title = {props.title} scrollY = {scrollY}/> 
                <ImageBackground source = {props.bg != null ? props.bg : require('../assets/images/noHeaderBg.png')} style = {{position: 'absolute', height: '100%', width: '100%', zIndex: -1}}/> 
                <View style = {{backgroundColor: 'white', bottom: 0, padding: 16, position: 'absolute', zIndex: -1, width: '100%'}}>
                    <Animated.Text category='h5' style = {{color: 'black', fontSize: 22, fontWeight: 'bold', opacity: opacityText}}>{props.title}</Animated.Text> 
                </View>  
            </Animated.View>
            <ScrollView
                scrollEventThrottle={16}
                style = {{flex: 1}} 
                onScroll = { 
                    e => {
                        scrollY.setValue(e.nativeEvent.contentOffset.y)
                    }}>   
                {props.content}
            </ScrollView>
        </>
    );
}

export default HeaderParallax

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white', 
        // justifyContent: 'center',
    },
})