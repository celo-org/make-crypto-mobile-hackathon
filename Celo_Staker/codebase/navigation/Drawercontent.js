import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { SafeAreaView } from "react-native"
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
    Drawer,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


import Firebase from '../config/firebase';
const auth = Firebase.auth();


async function onLogout() {

    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
    }
}

export function DrawerContent(props, {navigation}) {
    const [selected, setSelected] = React.useState(1);

    return (
        <>

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                
            </DrawerContentScrollView>
            <Box flex={1} bg="white" safeAreaTop>
                <Center flex={1}></Center>
                <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
                    <Button width="100%" bg="primary.900" onPress={onLogout}>Logout</Button>
                </HStack>
            </Box>

        </>

    )
}