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
    HStack,
    Center,
    Pressable,
} from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';





export default function Thankyou({ navigation }) {
    return (
        <>
            <Box safeAreaTop backgroundColor="primary.900" mb="2" />
            <Box bg="white" flex={1}>
                <Center>
                    <Image size="xl" source={require('../assets/images/onboard1.png')} />
                    <Heading>Thank You</Heading>
                    <Heading size="sm">Transaction Complete</Heading>
                </Center>

            </Box>
            <Box  bg="#fff" safeAreaTop>
      
      <HStack alignItems="center" safeAreaBottom shadow={6}>

          <Button
              size="lg"
              bg="primary.900"
              flex={1}
              onPress={()=>{navigation.navigate("Root")}}

          >
              Home
          </Button>
         
      </HStack>
  </Box>
        </>
    )
}

