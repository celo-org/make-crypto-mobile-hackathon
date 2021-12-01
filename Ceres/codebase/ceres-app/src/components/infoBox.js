



//Importações Externas
import React from "react"; 
import { View } from "react-native";
import { Text , useTheme } from '@ui-kitten/components';
  
export const InfoBox = (props) => {

    const theme = useTheme();
    const status = props.status;
    return (
        <View style = {[{backgroundColor: status != null ? theme[`color-${status}-100`] : theme['color-info-100'], borderRadius: 4, padding: 16, flexDirection: 'row'}, props.style]}>
            <Text style = {{color:  status != null ? theme[`color-${status}-900`] : theme['color-info-900'], }}> {props.title}</Text>
            <Text style = {{flexShrink: 1, fontWeight: 'bold',  color: status != null ? theme[`color-${status}-900`] : theme['color-info-900'], }}> {props.subtitle}</Text>
        </View>

    );
}
 