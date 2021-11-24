import React, {useEffect, useState} from 'react';
import {
  StyleSheet, Text
} from 'react-native';
import {Row, Button, GradientBackground, InputText } from "../../components";
import t from '../../i18n';
import { PRIMARY_COLOR, STANDARD_WHITE, WIDTH_DEVICE } from "../../constants";
import { Normalize } from "../../utils";
import { apiLogin, apiRegister } from "../../api";
import { Navigation } from "react-native-navigation";

const LoginScreen = ({ componentId }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
  }, []);

  const register = async () => {
    const registerRes = await apiRegister(email, password, username);
    console.log({registerRes})
    if (registerRes) {
      const loginRes = await apiLogin(email, password);
      Navigation.pop(componentId)
    } else {
      setError(true)
    }
  };

  return (
    <GradientBackground style={styles.container}>
      <Text style={styles.title}>{t('sign up')}</Text>
      <Text style={styles.description}>Register for create your NFT</Text>

      <InputText label={t('email')} value={email} onChangeText={setEmail}/>
      <InputText label={t('passowrd')} value={password} secureTextEntry onChangeText={setPassword}/>
      <InputText label={t('username')} value={username} onChangeText={setUsername}/>
      {!!error && <Text style={styles.error}>Complete all fields and use a valid email</Text>}
      <Row/>


      <Button text={t('register')} onPress={register} loading={loading} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Normalize(30),
    paddingTop: Normalize(50),
    paddingHorizontal: Normalize(15)
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: Normalize(20),
    fontWeight: '700'
  },
  description: {
    color: STANDARD_WHITE,
    fontSize: Normalize(14),
    marginBottom: Normalize(20),
  },
  error: {
    color: 'red'
  }
});

export default LoginScreen;
