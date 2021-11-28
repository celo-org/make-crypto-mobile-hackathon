import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from '../screens/Onboarding';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Root from '../screens/Home'
import Summary from '../screens/Summary'
import Amount from '../screens/Amount'
import Channel from '../screens/Channel'
import Address from '../screens/Address'
import PhoneSelection from '../screens/PhoneSelection'
import Test from '../screens/Test'
import {Box} from 'native-base';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import Firebase from '../config/firebase';
import Thankyou from '../screens/Thankyou';
import {DrawerContent} from "./Drawercontent"
import Validator from "../screens/Validator"
import Settings from "../screens/Settings"


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const auth = Firebase.auth();

function Home() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName="Root">
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Amount" component={Amount} />
        <Stack.Screen name="Channel" component={Channel} />
        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Thankyou" component={Thankyou} />
        <Stack.Screen name="Validator" component={Validator} />
       </Stack.Navigator>

    );
  }

export default function Rootnavigation() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
    
  
    useEffect(() => {
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
        try {
          await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      });
  
      // unsubscribe auth listener on unmount
      return unsubscribeAuth;
    }, []);

    if (isLoading) {
        return (
          <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' />
          </Box>
        );
      }

    if (user) {
        return (
            <NavigationContainer>
                <Drawer.Navigator edgeWidth={0}
                drawerContent={props=><DrawerContent {...props}/>}
                screenOptions={{
                    headerShown: false
                }}>
                    
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Validators" component={Validator} />
                    <Drawer.Screen name="Account" component={Settings} />
                </Drawer.Navigator>
            </NavigationContainer>
           
        );
    }
    else {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode="none">
                    <Stack.Screen name="Onboarding" component={Onboarding} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    
                </Stack.Navigator>
            </NavigationContainer> 
        );
    }

}