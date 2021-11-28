import React from "react"
import { Icon, Center, HStack, NativeBaseProvider, Spacer } from "native-base"
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHome, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
export const Example = () => {
  return (
  
      <HStack flex={1}  justifyContent="space-around" space={3}>
        
      <FontAwesomeIcon mr="10px" size="35px" color="#000"  icon={ faRedoAlt} />
      
       <FontAwesomeIcon ml="10px" size="35px" color="#000"  icon={ faHome} />
        
        
      </HStack>
   
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  )
}
