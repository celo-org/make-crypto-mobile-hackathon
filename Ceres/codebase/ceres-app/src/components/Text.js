
//Importações Externas
import React from "react";
import { StyleSheet } from "react-native";
import LottieView from  "lottie-react-native";
// import { Layout, Text} from '@ui-kitten/components';

import { Text }  from 'react-native';
//Indicação visual que algum registro não foi encontrado
const Texto = (props) => {
    const category = props.category;
    let size = 8;

    switch (category) {
        case 'p1':
            size = 16
            break;
        case 'h1': 
            size = 64;
        default:
            size = 9
            break;
    }
    return (
        <Text style = {{fontSize:size}}>{props.children}</Text>
    );
}

export default Texto

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
