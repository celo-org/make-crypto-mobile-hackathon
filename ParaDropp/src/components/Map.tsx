import { Box } from "native-base";
import React from "react";
import MapView from "react-native-maps";

const Map: React.FC<{}> = () => {
  return (
    <Box h="full">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </Box>
  );
};

export default Map;
