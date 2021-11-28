import React from "react";
import {
  Heading,
  Text,
  Box,
  Center,
  ZStack,
  ScrollView,
  Input,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import { Rides } from "../components/Rides";

const Home: React.FC = () => {
  return (
    <SafeAreaView>
      <ZStack>
        <Map />

        <Box paddingTop={5} alignSelf="center">
          <Input
            placeholder="Heading Somwhere?"
            background="white"
           size='xl'
            
          />
        </Box>
        <Rides />
      </ZStack>
    </SafeAreaView>
  );
};

export default Home;
