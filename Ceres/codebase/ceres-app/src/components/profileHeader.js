//Importações Externas
import React, { Fragment }  from 'react';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { Image, Platform, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';

//Serve como titulo de seção pelo app
export const ProfileHeader = ({navigation}) => {
    const theme = useTheme();
    const state = useSelector(state => state);
    const user = useSelector( state => state.userState);
    const notVerified = !user.phoneVerified || !user.emailVerified || !user.documentsVerified
    //  || !user.documentsVerified
    return (    
        <LinearGradient colors={[ theme['color-primary-600'], theme['color-info-300']]}>
            <Animatable.View  animation="bounceIn" duration = {1000} style = {{ width: '100%', flexDirection: 'column',  alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', padding: 16, marginTop: Platform.OS == 'ios' ? 20 : 0}}> 
                <TouchableWithoutFeedback  onPress = {() => navigation.navigate('Detail')}>
                    <Image style = {{height: 76, width: 76, borderRadius: 10}} source={ state.userState.photoUrl == null ? require('../assets/images/avatar.png') : {uri : state.userState.photoUrl}} ></Image>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress = {() => navigation.navigate('Detail')}>
                    <Layout style = {{flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', margin: 16}}>
                        <Text appearance = 'alternative' category='h5'>{ state.userState.name }</Text>
                        <Text appearance = 'alternative' category='p1'>ID 000000{ state.userState.id }</Text> 
                    </Layout>   
                </TouchableWithoutFeedback>
                {notVerified ?
                <TouchableOpacity  onPress = {() => navigation.navigate('VefifiedStatus')}>
                    <View style = {styles.card}>
                        <Text appearance = 'alternative' category='s2'>Conta não verificada</Text>
                    </View>
                </TouchableOpacity>:
               <TouchableOpacity>
                    <View style = {styles.card}>
                        <Text appearance = 'alternative' category='s2'>Conta verificada</Text>
                    </View>
                </TouchableOpacity>
                }

            </Animatable.View>   
        </LinearGradient> 
    );
}
 


  
const styles = StyleSheet.create({
    card: { 
        padding: 8, 
        paddingHorizontal: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 10, 
        backgroundColor: '#ffffff33',  
    }
  });