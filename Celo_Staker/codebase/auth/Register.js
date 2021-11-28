
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
  Divider
} from 'native-base';

import {kit } from '../root'
import {   
  requestAccountAddress,
  waitForAccountAuth,
} from '@celo/dappkit'
import * as Linking from 'expo-linking'

import Firebase from '../config/firebase';
import 'firebase/firestore';
const db = Firebase.firestore();
const auth = Firebase.auth();



export default function Register({navigation}) {

  const [password, setPassword] = useState()
  const [confPassword, setconfPassword] = useState()
  const [email, setEmail] = useState()
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState();


  const validate = async () => {
    if (password !== confPassword) {
      setErrors("passwords do not match")
      console.log("passwords do not match")
    } else{
       await auth.createUserWithEmailAndPassword(email, password)
       .then((userCredential) => {
         //At this point we redirect to home
       })
       .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorMessage)
         // ..
       });
    }
  };

  
 return (
      <NativeBaseProvider>
      <Box
        safeArea
        flex={1}
        p={2}
        w="90%"
        mx='auto'
        justifyContent="space-around"
      >
        <VStack>
        <Heading size="lg" color='primary.500'>
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign up to continue!
        </Heading>
        </VStack>
        

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label _text={{color: 'muted.700', fontSize: 'xl',
              fontWeight: 200}}>
                Email
            </FormControl.Label>
            <Input onChangeText={(value)=>{setEmail(value)}} size="2xl" />
          </FormControl>
          <FormControl>
            <FormControl.Label  _text={{color: 'muted.700', fontSize: 'xl',
              fontWeight: 200}}>
                Password
            </FormControl.Label>
            <Input onChangeText={(value)=>{setPassword(value)}} size="2xl" type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label  _text={{color: 'muted.700', fontSize: 'xl',
              fontWeight: 200}}>
               Confirm Password
            </FormControl.Label>
            <Input onChangeText={(value)=>{setconfPassword(value)}} size="2xl" type="password" />
          </FormControl>
          
          <VStack  space={2}  mt={5}>
          <Button onPress={() => validate()} colorScheme="cyan" _text={{color: 'white' }}>
              SignUp
          </Button>
          </VStack>

        </VStack>
        <Text fontSize="sm" color="muted.700" fontWeight={400}>
            {errors}
          </Text>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I already have an account
          </Text>
          <Link
            _text={{
              color: 'primary.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={() => validate()}
          >
            Login
            </Link>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}