import  React,{useState} from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
} from 'native-base';
import {kit } from '../root'
import {   
  requestAccountAddress,
  waitForAccountAuth,
} from '@celo/dappkit'
import * as Linking from 'expo-linking'
import Register from '../auth/Register'
import RNRestart from 'react-native-restart';

import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();



export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  
  const onLogin = async () => {
    
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);}
    } catch (error) {
      setLoginError(error.message);
    }
  };
  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <Heading size="xl" fontWeight="600" color="coolGray.800">
        Welcome
        </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
        </Heading>

      <VStack space={3} mt="10">
        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xl',
              fontWeight: 200,
            }}>
            Email ID
            </FormControl.Label>
          <Input size="2xl" onChangeText={text => setEmail(text)}  />
        </FormControl>
        <FormControl mt="5">
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xl',
              fontWeight: 200,
            }}>
            Password
            </FormControl.Label>
          <Input type="password" onChangeText={text => setPassword(text)}/>
          <Link
            _text={{ fontSize: 'xs', fontWeight: '500', color: 'primary.500' }}
            alignSelf="flex-end"
            mt="1">
            Forget Password?
            </Link>
        </FormControl>
        <Button onPress={onLogin} size="lg" mt="5" color="primary.900" _text={{ color: 'white' }}>
          Sign in
          </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I'm a new user.{loginError}
          </Text>
          <Link
            _text={{
              color: 'primary.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={() => navigation.navigate('Register')}
          >
            Sign Up
            </Link>
        </HStack>
      </VStack>
    </Box>
  );
}