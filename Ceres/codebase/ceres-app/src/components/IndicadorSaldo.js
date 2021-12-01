//Importações Externas
import {Icon, Text, useTheme} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState, useEffect, useContext} from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

//Importações Internas
import {Toast} from '../components/PopUp';
import {getCotacao} from '../api/getCotacao';
import {roundCelo} from '../shared/roundNumbers';
import {formatarReal} from '../shared/roundNumbers';
import {getUserBalance} from '../api/getUserBalance';
import * as configActions from '../store/actions/config';
import {updateUserDataFinished} from '../store/actions/control';
import * as NavigationService from '../navigation/NavigationService';
import BalanceActionsButton from '../screens/homescreen/balanceActionsButton';
import {addUserBalance, addUserPoints, setWallets} from '../store/actions/user';
const IndicadorSaldo = (props) => {
  const user = useSelector((state) => state.userState);
  const config = useSelector((state) => state.configState);
  const theme = useTheme();

  var saldo = roundCelo(user.balance, 2);

  let saldoBRL = formatarReal(saldo * config.brlValue);

  const control = useSelector((state) => state.controlState);
  const dispatch = useDispatch();

  // const { translations } = useContext(LocalizationContext);
  const variante = props.variante;
  const clear = variante == 'clear';
  const carteira = variante == 'carteira';
  const opcoes = props.opcoes;

  useEffect(() => {
    getUserBalance()
      .then((response) => {
        let points = response.data.points;
        // let balance = response.data.balance;

        console.log(
          '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n Carteira: ' +
            JSON.stringify(response.data),
        );
        //Soma os valores em todas as carteiras
        let balance = response.data.wallets.reduce(
          (soma, atual) => soma + atual.balance,
          0,
        );
        // alert(balance)
        if (balance < 0 || balance == 'undefined' || balance == null) {
          dispatch(addUserBalance(-1));
        } else {
          dispatch(addUserBalance(balance));
        }
        if (points < 0 || points == 'undefined' || points == null) {
          dispatch(addUserPoints(-1));
        } else {
          dispatch(addUserPoints(response.data.points));
        }
        dispatch(setWallets(response.data.wallets));
        dispatch(updateUserDataFinished());
      })
      .catch((error) => {
        Toast.show({
          title: 'Tivemos um erro',
          text: 'Tivemos um erro ao buscar seu saldo',
          color: theme['color-danger-default'],
        });
      });

    getCotacao()
      .then((response) => {
        dispatch(configActions.setBRLValue(response.data.BRL.price));
      })
      .catch((error) => {
        console.log('GET COTACAO: ' + JSON.stringify(error.message));
      });
  }, [control.userDataUpdating]);

  const RenderEyeIcon = (props) => {
    const carteira = props.variante == 'carteira';
    const theme = useTheme();
    return (
      <TouchableWithoutFeedback
        onPress={() => dispatch(configActions.setSaldoVisivel())}>
        <Icon
          fill={carteira ? 'white' : theme['color-primary-default']}
          style={{height: 24, width: 24, marginLeft: 8}}
          name={config.saldoVisivel ? 'eye' : 'eye-off'}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => NavigationService.navigate('Carteiras')}>
      <LinearGradient
        colors={[
          carteira ? theme['color-primary-600'] : 'white',
          carteira ? theme['color-info-300'] : '#f9f9f9',
        ]}
        style={{display: 'flex', backgroundColor: 'grey', padding: 24}}>
        {/* Seu saldo */}
        <View style={{flexDirection: 'row'}}>
          <Text category="c1" status={carteira ? 'control' : 'primary'}>
            {'Saldo Total'}
          </Text>
        </View>
        {/* Fim seu dado */}
        {/* Saldo */}
        {control.userDataUpdating ? (
          <ShimmerPlaceHolder
            autoRun={true}
            style={{marginTop: 18, height: 36, width: 130, marginBottom: 8}}
          />
        ) : user.balance == -1 ? (
          <Text
            category="s1"
            appearance={clear ? 'default' : 'alternative'}
            style={{marginTop: 16, fontWeight: 'bold', marginBottom: 16}}>
            Saldo Indisponível
          </Text>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            {config.saldoVisivel ? (
              <Text
                category="h1"
                status={carteira ? 'control' : 'primary'}
                style={{marginBottom: -4, fontWeight: 'bold'}}>
                {saldo}
              </Text>
            ) : (
              <Text
                category="h1"
                status={carteira ? 'control' : 'primary'}
                style={{
                  marginBottom: -4,
                  marginLeft: 8,
                  marginRight: 4,
                  fontWeight: 'bold',
                }}>
                **.**
              </Text>
            )}
            <Text category="h6" status={carteira ? 'control' : 'primary'}>
              {' '}
              {config.currency}
            </Text>

            <RenderEyeIcon variante={variante} />
          </View>
        )}
        <View style={{flexDirection: 'row'}}>
          {control.userDataUpdating ? (
            <ShimmerPlaceHolder
              autoRun={true}
              style={{marginTop: 8, height: 24, width: 60}}
            />
          ) : user.balance == -1 ? (
            <Text
              category="s1"
              appearance={clear ? 'default' : 'alternative'}
              style={{marginTop: 8, fontWeight: 'bold'}}>
              Saldo Indisponível
            </Text>
          ) : config.saldoVisivel ? (
            <Text
              category="s1"
              status={carteira ? 'control' : 'primary'}
              style={{marginTop: 8}}>
              {saldoBRL}
            </Text>
          ) : (
            <Text
              category="s1"
              status={carteira ? 'control' : 'primary'}
              style={{marginTop: 8}}>
              R$ **,**
            </Text>
          )}
        </View>
        {/* Fim do saldo */}
        {/* Ações do saldo */}

        {carteira && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <BalanceActionsButton
              navigation={props.navigation}
              id="sacar"
              title={'Sacar'}
              icon={'arrow-up-outline'}
              url={'Withdraw'}
              status={1}
              variante={props.variante}
            />
            <BalanceActionsButton
              navigation={props.navigation}
              id="extrato"
              title={'Extrato'}
              icon={'receipt-outline'}
              url={'Extrato'}
              status={2}
              variante={props.variante}
            />
            <BalanceActionsButton
              navigation={props.navigation}
              id="receber"
              title={'Receber'}
              icon={'arrow-down-outline'}
              url={'Carteiras'}
              status={2}
              variante={props.variante}
            />
            <BalanceActionsButton
              navigation={props.navigation}
              id="converter"
              title={'Converter'}
              icon={'repeat-outline'}
              url={'Extrato'}
              status={3}
              variante={props.variante}
            />
          </View>
        )}
        {/* Fim ações do saldo */}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default IndicadorSaldo;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  balance: {},
});
