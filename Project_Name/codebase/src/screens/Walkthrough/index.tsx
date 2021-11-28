import React, { useRef, useState } from 'react';
import { View, FlatList, Animated } from 'react-native';
import OnboardingItem from '@nft/components/OnboardingItem';
import { slides } from '@nft/utils/slides';

import Paginator from '@nft/components/Paginator';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const Walkthrough = (): JSX.Element => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const navigate = useNavigation();
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };
  const handleStart = async () => {
    await AsyncStorage.setItem('@hipa:isFirstTime', 'no');

    navigate.navigate('Home');
  };

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

      <Paginator
        data={slides}
        scrollX={scrollX}
        onPress={currentIndex !== 2 ? scrollTo : handleStart}
        label={currentIndex !== 2 ? 'Next' : 'Start'}
      />
    </View>
  );
};

export default Walkthrough;
