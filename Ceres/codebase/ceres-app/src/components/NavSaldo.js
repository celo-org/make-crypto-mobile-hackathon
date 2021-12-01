//Importações Externas
import React from 'react';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {View, TouchableWithoutFeedback} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {
  Layout,
  Text,
  Icon,
  Avatar,
  useTheme,
  Popover,
} from '@ui-kitten/components';

//Importações Internas
import * as NavigationService from '../navigation/NavigationService';
import {roundCelo} from '../shared/roundNumbers';

const RenderLeft = ({navigation, variante}) => {
  const carteira = variante == 'carteira';
  const theme = useTheme();

  const user = useSelector((state) => state.userState);
  const name = user.name;

  let userPhoto = null;

  if (auth().currentUser != null) {
    userPhoto = auth().currentUser.photoURL;
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {/* Icone do QR Code */}
      {/* <TouchableNativeFeedback  onPress = {() => navigation.navigate('Profile')}>
                <Icon fill = {carteira ? 'white' : theme['color-primary-default']} style = {{height: 24, width: 24, margin: 8, marginRight: 0}} name={'square-outline'}/>
            </TouchableNativeFeedback> */}
      <TouchableWithoutFeedback
        onPress={() => NavigationService.navigate('Profile')}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Avatar
            size="tiny"
            style={{margin: 8}}
            shape="rounded"
            source={
              userPhoto == null
                ? require('../assets/images/avatar.png')
                : {uri: userPhoto}
            }
          />
          <View style={{flexDirection: 'row'}}>
            <Text
              category="s1"
              status={carteira ? 'control' : 'primary'}
              style={{paddingTop: 10}}>
              {' '}
              Olá,{' '}
            </Text>
            <Text
              category="s1"
              status={carteira ? 'control' : 'primary'}
              style={{paddingTop: 10, fontWeight: 'bold'}}>
              {name != null ? name.split(' ', 1) : 'NONAMEFOUND'}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Saldo = ({saldo}) => {
  const theme = useTheme();

  const config = useSelector((state) => state.configState);
  const control = useSelector((state) => state.controlState);

  return (
    <View style={{marginLeft: 8}}>
      <TouchableNativeFeedback
        onPress={() => NavigationService.navigate('Carteiras')}>
        <Layout
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 24,
            backgroundColor: theme['color-success-default'],
          }}>
          {control.userDataUpdating ? (
            <ShimmerPlaceHolder
              autoRun={true}
              style={{height: 20, width: 48, borderRadius: 4}}
            />
          ) : config.saldoVisivel ? (
            <Text status="control" category="s1" style={{fontWeight: 'bold'}}>
              $ {saldo}
            </Text>
          ) : (
            <Text status="control" category="s1" style={{fontWeight: 'bold'}}>
              $ **.**{' '}
            </Text>
          )}
        </Layout>
      </TouchableNativeFeedback>
    </View>
  );
};

const Pontos = ({pontos}) => {
  const theme = useTheme();

  const config = useSelector((state) => state.configState);
  const control = useSelector((state) => state.controlState);

  return (
    <View style={{marginLeft: 8}}>
      <TouchableNativeFeedback
        onPress={() => NavigationService.navigate('Servicos')}>
        <Layout
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 24,
            backgroundColor: theme['color-info-default'],
            flexDirection: 'row',
          }}>
          {control.userDataUpdating ? (
            <ShimmerPlaceHolder
              autoRun={true}
              style={{height: 20, width: 40, marginRight: 12, borderRadius: 4}}
            />
          ) : config.saldoVisivel ? (
            <Text status="control" category="s1" style={{fontWeight: 'bold'}}>
              {pontos}{' '}
            </Text>
          ) : (
            <Text status="control" category="s1" style={{fontWeight: 'bold'}}>
              ***{' '}
            </Text>
          )}
          <Avatar
            size="tiny"
            source={require('../assets/images/points_icon.png')}
            style={{width: 20, height: 20}}
          />
        </Layout>
      </TouchableNativeFeedback>
    </View>
  );
};

const RenderRight = (props) => {
  const [visible, setVisible] = React.useState(false);

  const theme = useTheme();
  const carteira = props.variante == 'carteira';
  const user = useSelector((state) => state.userState);

  const points = user.points;
  const balance = roundCelo(user.balance, 2);

  const RenderBellIcon = () => (
    <TouchableWithoutFeedback onPress={() => setVisible(true)}>
      <Icon
        fill={carteira ? 'white' : theme['color-primary-default']}
        style={{height: 24, width: 24, margin: 4, marginLeft: 8}}
        name={'bell'}
      />
    </TouchableWithoutFeedback>
  );

  const RenderGiftIcon = () => (
    <TouchableWithoutFeedback
      onPress={() => NavigationService.navigate('PromoCode')}>
      <Icon
        fill={carteira ? 'white' : theme['color-primary-default']}
        style={{height: 24, width: 24, margin: 4, marginLeft: 8}}
        name={'gift'}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout
      style={{
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        right: 16,
      }}>
      <Saldo saldo={balance} />
      {/* <Pontos pontos={points} /> */}
      <RenderGiftIcon />
      <Popover
        visible={visible}
        anchor={RenderBellIcon}
        onBackdropPress={() => setVisible(false)}>
        <Layout style={{padding: 24, paddingVertical: 36}}>
          <Text>Sem novas notificações</Text>
        </Layout>
      </Popover>
    </Layout>
  );
};
//Serve como titulo de seção pelo app
const NavSaldo = (props) => {
  const theme = useTheme();

  const carteira = props.variante == 'carteira';

  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: carteira ? theme['color-primary-600'] : 'white',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: carteira ? 'white' : theme['color-primary-default'],
      }}>
      <RenderLeft variante={props.variante} />
      <RenderRight variante={props.variante} />
    </View>
  );
};

export default NavSaldo;
