//Importações externas
import React, { useState, useEffect, Fragment } from 'react';
import { Text, Layout, Card, Modal, useTheme, Button } from '@ui-kitten/components';
import { Animated, Platform, SafeAreaView, ScrollView, StyleSheet}  from 'react-native'; 

//Importações Internas
import { getData } from '../memoryAccess/getData'
import { ThemeContext } from '../../theme-context';  
import { deleteUserApi } from '../api/deleteUserApi';
import HeaderParallax from '../components/headerParallax';

const deleteUserFirebase = async () => {
    var user = auth().currentUser;
    user.delete().then(function() {
        console.log('usuario deletado do firebase')
    }).catch(function(error) {
        console.log(error.menssage)
    });
}
    
export const MyDataScreen = (props) => {

    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    const theme = useTheme(); 

    const [visible, setVisible] = useState(false);
    
    const clear = async (props) => {
        console.log('excluindo')
        setVisible(false)
        useEffect(() => {
            let id = null
            getData('@userData').then( data => {
                id = data.id
                deleteUserApi(id).then(() => {
                    deleteUserFirebase()
                });
            })
          }, [])
    };

    const RenderContent = () => {
        return (
            <Fragment>
                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setVisible(false)}>
                    <Card disabled={true}>
                        <Layout style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
                            {/* <Layout style = {{margin: 8, height: 50, width: 50, borderRadius: 25,backgroundColor: theme['color-danger-default'], justifyContent: 'center', alignItems: 'center'}}> */}
                                {/* <Icon fill='white' style = {{height: 24, width: 24, alignSelf: 'right'}} name='log-out-outline'/> */}
                            {/* </Layout> */}
                            <Text  style = {{marginTop: 8}} category = 'h5' status = 'danger'>Apagar dados</Text>
                            <Text  style = {{marginTop: 8}} category = 'p1' appearance = 'hint'>Tem certeza que deseja excluir sua conta?</Text>
                            <Text  style = {{marginTop: 16, textAlign: 'center'}} category = 'p1' >Todos seus dados e possivel saldo</Text>
                            <Text  style = {{ textAlign: 'center'}} category = 'p1' > será deletado dos nossos sistemas</Text>
                            <Layout style = {{ display: 'flex', flexDirection: 'row', paddingTop: 16}}>
                                <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false)}>
                                    CANCELAR
                                </Button>
                                <Button style = {{margin: 12}} status = 'danger' onPress={() => clear()}>
                                    APAGAR
                                </Button>
                            </Layout>
                        </Layout>          
                    </Card>
                </Modal>
                   
                <Layout style={{paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', padding: 16,}}>
                    <Text style={{textAlign: 'center', marginTop: 48}}>Seus dados estão seguros com a Ceres segundo nossa politica de privacidade</Text>
                    <Text appearance = 'hint' style={{textAlign: 'center', marginTop: 48}}>Ao clicar no botão abaixo, todos os dados sobre você em nossos servidores serão excluídos e sua conta encerrada</Text>
                    <Text status='danger' category='s1' style={{textAlign: 'center', marginTop: 16}}>Essa operação não pode ser desfeita</Text>
                </Layout>
                <Layout style={{paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', padding: 16,}}>
                    <Button style = {styles.button} status='danger' appearance='outline' onPress={() => setVisible(true)}>Apague meus dados</Button> 
                </Layout>
          </Fragment>
        );
      };

    // const [scrollY] = useState(new Animated.Value(0))

    let bgImage = require('../assets/images/mydata_bg.jpg')
    

    return(
        <Fragment>
        { Platform.OS == 'ios' &&
        <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
        }
        <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
        }}>
            <HeaderParallax  title = {'Meus dados'} bg = {bgImage}   content = {<RenderContent/>}/>
            {/* <ScrollView 
               scrollEventThrottle={16} 
                onScroll = {e => { scrollY.setValue(e.nativeEvent.contentOffset.y)}}> 
                <RenderContent/>
            </ScrollView>  */}
      </SafeAreaView>
      </Fragment>
    )
};
 


const styles = StyleSheet.create({
    buttonCase:{
      width: '100%',
      padding: 4,
      padding: 50,
      paddingHorizontal: 48,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
  });