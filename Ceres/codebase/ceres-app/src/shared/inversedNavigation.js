 
import React from 'react';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { View } from 'react-native'
const BackIcon = (style) => (
  <Icon {...style} fill = 'white' name='arrow-back'/>
);
 
export const InversedTopNavigationHeader = ({navigation }) => {
 
  
  BackAction = ( ) => (
      <TopNavigationAction onPress = {()=> navigation.goBack()} icon={BackIcon}/>
  )

return(
  <View style = {{marginTop: 24, backgroundColor: 'transparent', height: 60, width: '100%', padding: 8, justifyContent: 'center', zIndex: 1000, marginBottom: -60}}>
    <BackAction/>
    {/* <TopNavigation
      title= {title}
      subtitle= {subtitle}
      alignment='center'
      leftControl={BackAction()}
    /> */}
  </View>
  )
}