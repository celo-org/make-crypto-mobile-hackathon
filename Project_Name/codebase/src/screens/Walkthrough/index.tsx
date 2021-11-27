import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated } from 'react-native';
import OnboardingItem from '@nft/components/OnboardingItem';
import { slides } from '@nft/utils/slides';

import Paginator from '@nft/components/Paginator';

import { styles } from './styles';

const Walkthrough = (): JSX.Element => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      console.log(currentIndex);
    }
  };

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.containerItems}>
        <FlatList
          bounces={false}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={slides}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <OnboardingItem image={item.image} title={item.title} description={item.description} />
          )}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          ref={slidesRef}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} onPress={scrollTo} />
    </View>
  );
};

export default Walkthrough;
