//Importações Externas
import {useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {Button, Spinner, Text} from '@ui-kitten/components';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
//Importações Internas
import {getPinStatus} from '../api/getPinStatus';
import {CustomHeader} from '../shared/customHeader';
import PaymentAction from '../components/PaymentAction';
import * as NavigationService from '../navigation/NavigationService';

const pixOptions = [
  {
    id: 'telefone',
    titulo: 'Telefone',
    icone: 'arrow-down-outline',
    url: 'Addaccount',
    additionalData: {type: 'fiat', variant: 'PHONE'},
  },
  {
    id: 'cpf',
    titulo: 'CPF',
    icone: 'arrow-down-outline',
    url: 'Addaccount',
    additionalData: {type: 'fiat', variant: 'CPF'},
  },
  {
    id: 'email',
    titulo: 'Email',
    icone: 'arrow-down-outline',
    url: 'Addaccount',
    additionalData: {type: 'fiat', variant: 'EMAIL'},
  },
  {
    id: 'aleatoria',
    titulo: 'Chave aleatória',
    icone: 'arrow-down-outline',
    url: 'Addaccount',
    additionalData: {type: 'fiat', variant: 'RANDOM'},
  },
];

const cryptoOptions = [
  {
    id: 'cUSD',
    titulo: 'Lovecrypto',
    imageIcon:
      'https://lh3.googleusercontent.com/vzRuiDWtO6Ridj1in4ugk9QBv8tyIixKRFYlqcNAyq2XdZyX6VE2aKj-4yNmhfEbJQ',
    url: 'Addaccount',
    additionalData: {
      type: 'crypto',
      variant: 'lovecrypto',
      wallet: 'lovecrypto',
    },
  },
  {
    id: 'cUSD',
    titulo: 'Celo',
    imageIcon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7236.png',
    url: 'Addaccount',
    additionalData: {type: 'crypto', variant: 'celo', wallet: 'celo'},
  },
];

export const LinkedAccountsScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [hasPIN, setHasPIN] = useState(false);

  const user = useSelector((state) => state.userState);

  useEffect(() => {
    getPinStatus()
      .then((response) => {
        setLoading(false);
        setHasPIN(response.data.password_defined);
      })
      .catch((error) => {
        console.log('ERROR ' + error.message);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
      }}>
      <CustomHeader
        navigation={props.navigation}
        title={'Tipo de transferência'}
      />
      <ScrollView>
        <View style={{padding: 24}}>
          <Text category="s1">
            {'Escolha como você deseja retirar o saldo da sua conta'}
          </Text>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Text category="s1" style={{fontWeight: 'bold'}}>
            Receber via PIX
          </Text>
          {loading ? (
            <View
              style={{
                width: '100%',
                height: 136,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Spinner size="giant" status="info" />
            </View>
          ) : hasPIN ? (
            user.phoneVerified &&
            user.documentsVerified &&
            user.emailVerified ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 16}}
                fadingEdgeLength={100}>
                {pixOptions.map((item, index) => (
                  <PaymentAction
                    key={index}
                    id={`Pix_${item.id}`}
                    title={item.titulo}
                    icon={item.icone}
                    url={item.url}
                    active={true}
                    additionalData={item.additionalData}
                    navigation={props.navigation}
                  />
                ))}
              </ScrollView>
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 136,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text appearance="hint" style={{textAlign: 'center'}}>
                  Antes você deve concluir algumas etapas de verificação
                </Text>
                <Button
                  size="small"
                  style={{marginTop: 16}}
                  onPress={() => NavigationService.navigate('VefifiedStatus')}>
                  Concluir Verificação
                </Button>
              </View>
            )
          ) : (
            <View
              style={{
                width: '100%',
                height: 136,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text appearance="hint">Você precisa antes definir um pin</Text>
              <Button
                size="small"
                style={{marginTop: 16}}
                onPress={() => NavigationService.navigate('Pin')}>
                Definir PIN
              </Button>
            </View>
          )}
          <Text category="s1" style={{fontWeight: 'bold', marginTop: 24}}>
            Receber via Crypto
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 16}}
            fadingEdgeLength={100}>
            {cryptoOptions.map((item, index) => (
              <PaymentAction
                key={index}
                id={`Crypto_${item.id}`}
                title={item.titulo}
                imageIcon={item.imageIcon}
                url={item.url}
                active={true}
                additionalData={item.additionalData}
                navigation={props.navigation}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#ffffff33',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modal: {
    bottom: 0,
    position: 'absolute',
    height: '50%',
    marginTop: '50%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  accountTypes: {
    flex: 1,
    marginTop: -8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
