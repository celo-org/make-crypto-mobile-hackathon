//Importações Externas
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
Icon.loadFont();
//Importações Internas
import {logEvent} from '../../shared/analyticsLog';
import * as NavigationService from '../../navigation/NavigationService';
const BalanceActionsButton = (props) => {
  const theme = useTheme();

  const pressAction = () => {
    logEvent(`saldo_${props.id}`);
    if (props.status != 3) {
      NavigationService.navigate(props.url);
    }
  };

  return (
    <TouchableOpacity onPress={() => pressAction()}>
      {props.status == 2 && (
        <View
          style={{
            backgroundColor: theme['color-warning-500'],
            padding: 4,
            paddingHorizontal: 8,
            borderRadius: 8,
            position: 'absolute',
            top: 4,
            right: 24,
            zIndex: 1,
          }}>
          <Text category="c2">novo</Text>
        </View>
      )}
      {props.status == 3 && (
        <View
          style={{
            backgroundColor: theme['color-info-500'],
            padding: 4,
            paddingHorizontal: 8,
            borderRadius: 8,
            position: 'absolute',
            top: 4,
            right: 12,
            zIndex: 1,
          }}>
          <Text category="c2" appearance="alternative">
            em breve
          </Text>
        </View>
      )}
      <View style={styles.card}>
        <View
          style={[
            {
              backgroundColor:
                props.variante == 'carteira'
                  ? '#ffffff33'
                  : theme['color-primary-transparent-100'],
            },
            styles.avatar,
          ]}>
          <Icon
            name={props.icon}
            size={20}
            color={
              props.variante == 'carteira'
                ? 'white'
                : theme['color-primary-default']
            }
          />
        </View>
        <View style={styles.textBox}>
          <Text
            category="c2"
            status={props.variante == 'carteira' ? 'control' : 'primary'}
            style={{fontWeight: 'bold', textAlign: 'center'}}>
            {props.title}{' '}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BalanceActionsButton;

const styles = StyleSheet.create({
  card: {
    width: 90,
    paddingHorizontal: 16,
    paddingVertical: 16,

    // backgroundColor: 'white',

    alignItems: 'center',

    borderRadius: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#',
    // marginTop: 8
    // backgroundColor: 'red'
  },
  textBox: {
    paddingTop: 8,
  },
  closeButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
});
