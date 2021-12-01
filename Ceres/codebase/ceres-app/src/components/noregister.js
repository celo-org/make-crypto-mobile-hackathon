
//Importações Externas
import React from "react";
import { StyleSheet } from "react-native";
import LottieView from  "lottie-react-native";
import { Layout, Text} from '@ui-kitten/components';
  
//Indicação visual que algum registro não foi encontrado
export const NoRegister = (props) => {
 
    return (
        <Layout level = '1' style={styles.containerImage}>
            <Text category='h3' status='info' style = {{textAlign: 'center'}}>{props.title}</Text>
            <Text category='h6'  style = {{textAlign: 'center', marginTop: 12}}>{props.subtitle}</Text>  
            <LottieView
                source={require("../assets/animations/noTasks.json")}
                loop
                autoPlay
                style = {{width: '100%', top: -20,  }} 
            /> 
            <Text category='s1' appearance = 'hint' style = {{textAlign: 'center', top: -50}}>{props.lowerInfo}</Text>   
        </Layout>
    );
}

const styles = StyleSheet.create({  
    noMoreTasks: {
        marginTop: 20,
        width: 200,
        height: 200,
    },
    containerImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingVertical: 32,

      },
  });
