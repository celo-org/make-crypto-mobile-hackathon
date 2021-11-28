import { Box, Text, ScrollView } from "native-base";
import React from "react";
// @ts-ignore
import BottomSheet from "react-native-simple-bottom-sheet";

export const Rides: React.FC<{}> = () => {
  return (
    <Box w="full" flex="1" alignSelf="center" position="absolute" bottom="0">
      <BottomSheet isOpen>
        {(onScrollEndDrag: any) => (
          <Box></Box>
          //   <ScrollView onScrollEndDrag={onScrollEndDrag}>
          //     {[...Array(20)].map((_, index) => (
          //       <Box key={`${index}`} style={{}}>
          //         <Text>{`List Item ${index + 1}`}</Text>
          //       </Box>
          //     ))}
          //   </ScrollView>
        )}
      </BottomSheet>
    </Box>
  );
};
