// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import Login from './screens/login';
import App1 from './screens/app1';
import Register from './screens/register';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

class App extends React.Component {
  render() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="App1" component={App1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

export default App;