//Importações Externas
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Text, Layout, Avatar} from '@ui-kitten/components';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

Icon.loadFont();
//Importações Internas

export const ProfileOption = (props) => {
    // console.log(props.type) 
    return(
        <Layout  style = {{ borderRadius: 10, marginVertical: 8, width: '100%', borderColor: '#E7ECF4', borderWidth: 1 }}>
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#D0E9FA')}  onPress={() => props.navigation.navigate(props.route, props.routeData)}>
                <Layout  level='2' style = {{ width: '100%', padding: 16, justifyContent: 'space-between', display: 'flex', flexDirection: 'row', borderRadius: 10}}>
                    <Layout style = {{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
                        {props.icon != null  &&
                            <Icon fill='#222B45' size = {20} name={props.icon} style = {{alignSelf:'center'}}/> 
                        }
                        {props.logo != null && 
                            <Avatar shape='rounded' size = 'small' source={props.type == 'CELO' ? require('../assets/images/cryptoOptions/celo.png') : props.type == 'CUSD' ? require('../assets/images/cryptoOptions/celoDollar.png') : require('../assets/images/cryptoOptions/cusd.jpg')} style = {{ marginTop: 4}}/>
                        }
                        <Text category = 'p1' style = {{ marginLeft: 10, marginTop: 3 }}>{props.title}</Text>
                    </Layout>
                    <Icon fill='#222B45' size = {20} name='chevron-right' style = {{alignSelf:'center'}}/> 
                </Layout>
            </TouchableNativeFeedback>
        </Layout>
    );
}