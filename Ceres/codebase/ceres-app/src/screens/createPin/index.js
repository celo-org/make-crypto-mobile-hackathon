//Importações Externas
import React, { useEffect, useState } from 'react';
import {Layout, Spinner } from '@ui-kitten/components';
import { Animated, SafeAreaView, ScrollView, StyleSheet, View}  from 'react-native';
 
//Importações Internas
import { ValidatePin } from './validatePin';
import { ChangePin } from './changePin';
import { getPinStatus } from '../../api/getPinStatus';
import { CustomHeader } from '../../shared/customHeader'; 
  
export const CreatePinScreen = (props) => { 
   
    const [scrollY] = useState(new Animated.Value(0))

    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(true)

    useEffect(()=>{
        getPinStatus().then(response =>{
            setLoading(false)
            setValidated(response.data.password_defined)
        }).catch(error =>{
            console.log("ERROR " + error.message)
        })
          
    }, [])

    const bgImage = require('../../assets/images/promo_code_bg.jpg')

    return(
        
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: '#FFFFFF'}}>  
            <CustomHeader navigation = {props.navigation} title = {'Pin'}/> 
            <View style = { styles.card}> 
                {loading ?
                    <Layout style = {{marginTop: 64, alignItems: 'center'}}>
                        <Spinner status = 'info' size='giant'/>
                    </Layout>:
                    validated ?
                        <ChangePin navigation = {props.navigation}/>:
                        <ValidatePin navigation = {props.navigation}/>
                } 
            </View> 
        </SafeAreaView>
    )
};
  
const styles = StyleSheet.create({
    card: { 
        paddingVertical: 24,
        paddingHorizontal: 16,   
    }, 
  });