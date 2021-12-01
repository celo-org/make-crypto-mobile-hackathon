//Importações Externas
import React from "react";
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { View, TouchableWithoutFeedback} from 'react-native'
import { Layout, Text, Icon, Avatar, useTheme, Popover} from '@ui-kitten/components';

var userPhoto = null 

if(auth().currentUser != null){
    userPhoto = auth().currentUser.photoURL
}
// const state = useSelector(state => state.userState )
// console.log(state)


const AvatarIcon = ({navigation, url, name}) => (
    <TouchableWithoutFeedback  onPress = {() => navigation.navigate('Profile')}>
        <View style = {{display: 'flex', flexDirection: 'row'}}>
            <Avatar size='tiny' style={{margin: 8}} shape='rounded'  source={url == null ? require('../assets/images/avatar.png') :  {uri : url}}/>
            <View style = {{flexDirection: 'row'}}>
                <Text category='s1' appearance='alternative' style = {{paddingTop: 10}}> Olá, </Text>
                <Text category='s1' appearance='alternative' style = {{paddingTop: 10, fontWeight: 'bold'}}>{name != null ? name.split(' ', 1) : 'NONAMEFOUND'}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
);
 
//Serve como titulo de seção pelo app
export const LovecryptoLogoHeader = ({navigation}) => {
    
    const theme = useTheme();
    const user = useSelector(state => state.userState);
    
    const [visible, setVisible] = React.useState(false);
    
    const RenderBellIcon = () => (
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <Icon fill = 'white' style = {{height: 24, width: 24, margin: 8, marginRight: 0}} name={'bell'}/>
        </TouchableWithoutFeedback>
    );

    const RenderGiftIcon = () => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('PromoCode')}>
          <Icon fill = 'white' style = {{height: 24, width: 24, margin: 8,}} name={'gift'}/>
        </TouchableWithoutFeedback>
    );
      
    return (
        <View style={{width: '100%', paddingVertical: 4, paddingHorizontal: 16, justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme['color-primary-600'], flexDirection: 'row' }} >
            <AvatarIcon navigation = { navigation } url = {user.photoUrl} name = {user.name}/>
            <Layout style = {{position: 'absolute', flexDirection: 'row', backgroundColor: 'transparent', right: 16}}>
                <RenderGiftIcon/>
                <Popover
                    visible={visible}
                    anchor={RenderBellIcon}
                    onBackdropPress={() => setVisible(false)}>
                    <Layout style={{padding: 24, paddingVertical: 36}}>
                        <Text>Sem novas notificações</Text>
                    </Layout>
                </Popover>
            </Layout>
        </View>
    );
}
 