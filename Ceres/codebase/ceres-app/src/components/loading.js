import React from 'react'
import { Layout, Text, Spinner} from '@ui-kitten/components';
import { View } from 'react-native'
//Serve como titulo de seção pelo app
export const Loading = (props) => {
    return (
        <View style={{width: '100%', heigth: 300, justifyContent: 'center', alignItems: 'center',}} >
             <Spinner size='giant' status='success'/>
        </View>
    );
}
