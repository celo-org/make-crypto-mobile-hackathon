//Importações Externas
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import React, { useState, Fragment, useContext } from 'react';
import { Layout, Text, Button, Icon, Modal, Card} from '@ui-kitten/components';

//Importações Internas
import { signOut } from '../store/actions/auth'; 
import { generalStyle } from '../shared/generalStyle';
import { clearWallet } from '../store/actions/withdraw';
import { androidVersion, iosVersion } from '../shared/constants';
import Social from './social';
 
//Serve como titulo de seção pelo app
export const ProfileFooter = props => {
 
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

 

    const signout = async () => {
        setVisible(false)
        await auth().signOut();
        dispatch(signOut())
        dispatch(removeUser())
        dispatch(clearWallet())
    };
   
    return (  
        <Fragment> 
            <Social/>
                <Modal
                visible={visible}
                backdropStyle={generalStyle.backdrop}
                onBackdropPress={() => setVisible(false)}
                >
                <Card disabled={true}>
                    <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
                        {/* <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25, backgroundColor: '#3366FF', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon fill='white' style = {{height: 24, width: 24, alignSelf: 'right'}} name='log-out-outline'/>
                        </Layout> */}
                        <Text  style = {{marginTop: 8}} category = 'h6'>{'Deslogar'}</Text>
                        <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>{'Tem certeza que deseja sair?'}</Text>
                        <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                            <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                                {'Cancelar'}
                            </Button>
                            <Button style = {{margin: 12}} status = 'danger' onPress={() => signout()}>
                                {'Deslogar'}
                            </Button>
                        </Layout>
                    </Layout>          
                </Card>
            </Modal>
            <Layout style = {{flex: 1, padding: 48, paddingTop: 36,  alignItems: 'center', width: '100%'}}>
                <Button appearance='outline' status = 'info' style = {{width: '80%'}} onPress={() =>  setVisible(true)}>{'Deslogar'}</Button>
                <Text category='s2' style = {{ marginTop: 60, }}>Ceres Inc</Text>
                <Text category='c1' style = {{ marginTop: 10, }} appearance='hint'>{`Ceres para ${Platform.OS} - Versão ${Platform.OS == 'ios' ? iosVersion : androidVersion}`}</Text>
            </Layout>
        </Fragment>
    );
}
 
