import React from 'react'

import SignIn from './SignIn';
import TaskList from './TaskList';
import Task from './Task';

import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens'; 
enableScreens();

const Stack = createNativeStackNavigator();


 
const App = () => {

  function LogoTitle() {
    return (
      <View style={{flexDirection: "row", alignItems: 'center'}}>
        <Image
          style={{ width: 40, height: 40, marginRight: 10 }}
          source={require('./assets/aster-tp-logo-img.png')}
        />
         <Image
          style={{ width: 50, height: 50 }}
          source={require('./assets/aster-tp.png')}
        />
      </View>
    );
  }

  return (
    <>  
       <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" 
            screenOptions={{
              headerStyle: {
                // backgroundColor: '#00000000',//'#FFCF00',
                // opacity: 0.5
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitle: (props) => <LogoTitle {...props} />,
              headerTransparent: true
            }}
            >
              <Stack.Screen name="SignIn" component={SignIn} 
              options={{
                title: 'Welcome',
                headerShown: false
              }}/>
              <Stack.Screen name="TaskList" component={TaskList} />
              <Stack.Screen name="Task" component={Task}/>
          </Stack.Navigator>
       </NavigationContainer>
    </>
  );
  
}

export default App;