//Importações Externas
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import React, {Fragment, useEffect, useState, useContext} from 'react';
import {StyleSheet, Linking} from 'react-native';
import {
  Layout,
  Icon,
  Text,
  useTheme,
  Button,
  Modal,
  Card,
} from '@ui-kitten/components';

//Importações Internas
import {signOut} from '../store/actions/auth';
// import { LocalizationContext } from '../locales';
import {removeUser} from '../store/actions/user';
import {androidVersion} from '../shared/constants';
import {generalStyle} from '../shared/generalStyle';
import {clearWallet} from '../store/actions/withdraw';
import {getMinimumVersion} from '../api/getMinimunVersion';
import {Alert} from './alert';
import {setAppVersion} from '../store/actions/control';

export const CheckVersion = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const [ControlVersion, setControlVersion] = useState('1.0.0');
  // const { translations, initializeAppLanguage } = useContext(LocalizationContext);
  // initializeAppLanguage(); //

  useEffect(() => {
    getMinimumVersion().then((response) => {
      setControlVersion(response.data.version);
      dispatch(setAppVersion(androidVersion));
      if (androidVersion < ControlVersion) {
        setVisible(true);
      }
    });
  }, []);

  const signout = async () => {
    // setVisible(false)
    if (auth().currentUser) {
      await auth().signOut();
      dispatch(signOut());
      dispatch(removeUser());
      dispatch(clearWallet());
    }
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=br.com.ceres.app',
    );
  };

  return (
    <Fragment>
      <Modal
        visible={visible}
        backdropStyle={generalStyle.backdrop}
        onBackdropPress={() => signout()}>
        <Card disabled={true}>
          <Layout
            style={{
              flex: 1,
              paddingTop: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Layout
              style={{
                margin: 8,
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: '#3366FF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                fill="white"
                style={{height: 24, width: 24, alignSelf: 'right'}}
                name="log-out-outline"
              />
            </Layout>
            <Text style={{marginTop: 8}} category="h6">
              {'App desatualizado'}
            </Text>
            <Text style={{marginTop: 8}} category="p1" appearance="hint">
              {'Seu APP precisa ser atualizado\n para continuar funcionando'}
            </Text>
            <Layout
              style={{display: 'flex', flexDirection: 'row', paddingTop: 16}}>
              <Button style={{margin: 12}} status="danger" onPress={signout}>
                {'Ok'}
              </Button>
            </Layout>
          </Layout>
        </Card>
      </Modal>
      {androidVersion < ControlVersion && (
        <Layout
          style={{
            padding: 16,
            justifyContent: 'space-around',
            backgroundColor: theme['color-danger-500'],
          }}>
          <Text category="p2" style={{color: 'white', fontWeight: 'bold'}}>
            {'Seu APP precisa ser atualizado para continuar funcionando'}
          </Text>
        </Layout>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#7A05C8',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    paddingTop: 16,
  },
});
