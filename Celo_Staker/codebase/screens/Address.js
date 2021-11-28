import React from "react";
import {
  VStack,
  FormControl,
  Input,
  NativeBaseProvider,
  Center,
  Button,
  Box,
  HStack,
} from "native-base";
import {  Clipboard } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";

function Address({parentCallback}) {
  const [formData, setData] = React.useState({});
  const [copiedText, setCopiedText] = useState('')

  const getCripboardText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
    console.log("pressed: ",copiedText)
  }

  onTrigger = (event) => {
    parentCallback("Data from child");
    console.log("gh")
}

  return (
      <>
      <Center flex={1}>
    <VStack width="90%" mx="3">
      <FormControl isRequired>
        <FormControl.Label >Address</FormControl.Label>
        <Input
          size="xl"
          placeholder="paste your address"
          value={copiedText}
          onChangeText={(value) => setData({ ...formData, name: value })}
          InputRightElement={
            <Button size="xs" m="1" onPress={()=>{getCripboardText()}}>
              paste
            </Button>
          }
        />
        <FormControl.HelperText _text={{fontSize: 'xs'}}>
          
        </FormControl.HelperText>
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Name</FormControl.ErrorMessage>
      </FormControl>
    </VStack>
    </Center>

    <Box  bg="white" >
        <Center flex={1} safeAreaBottom shadow={12}></Center>
        <Button size="lg" minWidth="100%" onPress={() => onTrigger}>Next</Button>
      </Box>
    </>
  );
}
export default Address;