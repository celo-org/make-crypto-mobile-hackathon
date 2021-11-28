
import React, { useState, useEffect } from 'react';

import {
  Input,
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  CheckIcon,
  Select,
} from "native-base"
import filter from 'lodash.filter';
import * as Contacts from 'expo-contacts';


function Phone() {

  const [myContacts, setContacts] = useState([]);
  const [MemoryContacts, setMemoryContacts] = useState([]);
  const {amount, coin}=route.params
  const [address, setAddress] = useState("")

  searchContacts = value => {
    const filteredContacts = MemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setContacts(filteredContacts);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
           if (data.length > 0) {
              setContacts(data)
              setMemoryContacts(data)}
      }
    })();
  }, []);


  return (
    <>
<Box
    w={{
      base: "100%",
      md: "25%",
    }}
  >
   
     <Input
          placeholder="Search"
          
          placeholderTextColor="#000"
          style={{
            
            height: 50,
            fontSize: 20,
            padding: 10,
            color: '#000',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0'
          }}
          onChangeText={value => searchContacts(value)}
        />
       
    <Heading fontSize="xl" p="4" pb="3">
      Contacts
    </Heading>
    <FlatList
      data={myContacts}
      renderItem={({ item }) => (
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: "gray.600",
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2"
        >
          <Pressable
          onPress={() => navigation.navigate("Summary",{"amount":amount, "channelType":"address", "coin":coin, "address":address})}
          >
          <HStack space={3} justifyContent="space-between">
            <Avatar
              size="48px"
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
              }}
            />
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {item.name}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.phoneNumbers[0].digits}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              alignSelf="flex-start"
            >
              {item.contactType}
            </Text>
          </HStack>
          </Pressable>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
    
  </Box>

 
  </>
  )




}


export default Phone;