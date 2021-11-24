import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DescriptionNft from '@nft/screens/DescriptionNFT';
import Home from '@nft/screens/Home';
import { RoutesNames } from '@nft/utils/enum';

const { Navigator, Screen } = createNativeStackNavigator();

const StackTabs = (): JSX.Element => {
  return (
    <Navigator>
      <Screen
        name="HomeTEste"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name={RoutesNames.DESCRIPTION_NFT}
        component={DescriptionNft}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

export default StackTabs;
