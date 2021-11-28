
import React, { useState, useEffect } from 'react';

import {
    Button,
  FormControl,
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
  Pressable,
  ChevronLeftIcon,
  ChevronRightIcon,
  IconButton
} from "native-base"
import {  Clipboard } from 'react-native'
import filter from 'lodash.filter';
import * as Contacts from 'expo-contacts';
import PhoneSelection from './PhoneSelection'
import Address from './Address'
import Amount from './Amount';


function Channel({route, navigation}) {

  
  let [channel, setChannel] = useState("address")
  const [myContacts, setContacts] = useState([]);
  const [MemoryContacts, setMemoryContacts] = useState([]);
  const [formData, setData] = useState({});
  const {amount, coin, cUSD}=route.params
  const [address, setAddress] = useState("")
  const [number, setNumber] = useState("")
  const [copiedText, setCopiedText] = useState('')
  const [empty, setEmpty] = useState(true)

  const getCripboardText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
    if(text != ""){
      setEmpty(false)
      console.log("pressed: ",copiedText)
    }
    
  }

  const next = ()=>{
    if(copiedText != ""){
      navigation.navigate("Summary",{"amount":amount,"cUSD":cUSD, "address":copiedText})
    }
  }

  const clearText = ()=>{
    setCopiedText("")
    setEmpty(true)
  }

  

  const getNumber =(number)=>{
    navigation.navigate("Summary",{"amount":amount, "address":number})
  }

  //console.log("I am in channel module: ",amount, "coin: ", coin)

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
    <Box safeAreaTop backgroundColor="primary.900" mb="2"/>

    <HStack mb="2" alignItems="center" space={4}>
      { channel == "contact" &&
        <IconButton onPress={()=>setChannel("address")} icon={<ChevronLeftIcon size="md" color="#000" />} />
      }
      { channel == "address" &&
        <IconButton  onPress={()=>{navigation.navigate("Amount", {"cUSD":cUSD})}}
        icon={<ChevronLeftIcon size="md" color="#000" />} />
      }
    
      <Select
        selectedValue={channel}
        minWidth="200"
        accessibilityLabel="Send To Mobile"
        placeholder="Send To Mobile"
        defaultValue="Send To Address"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => setChannel(itemValue)}
      >
        <Select.Item label="Send To Address" value="address" />
        <Select.Item label="Send To Mobile" value="contact" />
      </Select>
    </HStack>


 
{ channel=="contact" &&
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
     <Text p="2" pl="5" fontWeight="bold" color="#E02401">This feature only works on Main-net</Text>
     <FlatList
       data={myContacts}
       renderItem={({ item }) => (
         
         <Pressable
         
         >
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
           <HStack space={3} justifyContent="flex-start">
           <Avatar bg="cyan.500">C</Avatar>
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
             
             
           </HStack>
         </Box>
         </Pressable>
       )}
       keyExtractor={(item) => item.id}
     />
     
   </Box>
 
  
   </>

}
{channel=="address" &&
<>
      <Center flex={1}>
    <VStack width="90%" mx="3">
      <FormControl isRequired>
        <FormControl.Label >Address</FormControl.Label>
        <Input
          size="xl"
          value={copiedText}
          placeholder="paste your address"
          
          InputRightElement={
            <>
            { empty == true &&
              <Button size="xs" m="1" onPress={()=>{getCripboardText()}}>
              paste
            </Button>

            }
            { empty == false &&
              <Button size="xs" m="1" onPress={()=>{clearText()}}>
              clear
            </Button>

            }
            
            </>
          }
        />
        <FormControl.HelperText _text={{fontSize: 'xs'}}>
          
        </FormControl.HelperText>
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Name</FormControl.ErrorMessage>
      </FormControl>
    </VStack>
    </Center>

    <Box bg="white" safeAreaTop>
       <Center flex={1}></Center>
       <HStack bg="primary.900" alignItems="center" safeAreaBottom shadow={6}>

           <Pressable
               py="2"
               flex={1}
               onPress={()=>{navigation.navigate("Amount", {"cUSD":cUSD})}}

           >
               <Center>
                   <ChevronLeftIcon
                       size={36}
                       color="white"
                       size="xl"
                   />
                   
               </Center>
           </Pressable>
           <Pressable
               py="2"
               flex={1}
               onPress={() => next()}
           >
               
               <Center>
                   <ChevronRightIcon
                       size={40}
                       color="white"
                       size="xl"
                   />
                 
               </Center>
           </Pressable>
       </HStack>
   </Box>
    </>
}
    
  </>
  )




}


export default Channel;