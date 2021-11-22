import React, { useEffect, useState } from 'react';

import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import { FilterList, Nft, SquareButton, Text } from '@nft/components';

import MenuSvg from '@nft/assets/menu.svg';
import Magnifier from '@nft/assets/magnifier.svg';

import { colors, fontsFamily, fontsSize } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import { api } from '@nft/services/api';

import { styles } from './styles';

interface INFTProps {
  image: {
    url: string;
    title: string;
  };
  author: {
    name: string;
    image: string;
  };
  currency: string;
  isLiked: boolean;
  likes: number;
  tags: string[];
  value: number;
}

const Home = (): JSX.Element => {
  const [category, setCategory] = useState('');
  const [nfts, setNfts] = useState<INFTProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('1');

  const categories = [
    { filterKey: 'trending', title: 'Trending' },
    { filterKey: 'gamming', title: 'Gamming' },
    { filterKey: 'sports', title: 'Sports' },
    { filterKey: 'most_recent', title: 'Most Recent' },
  ];

  const handleSelectCategory = (category: string) => {
    setCategory(category);
  };

  const handleLikeImage = (id: number) => {
    console.log(id);
    //todo: patch to api
  };

  useEffect(() => {
    async function fetchNft() {
      try {
        setIsLoading(true);
        const response = await api.get(`/nft/list/${category}/${page}`);
        setPage((oldState) => oldState + 1);
        setNfts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNft();
  }, [category]);

  useEffect(() => {
    setCategory(categories[0].filterKey);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}></View>
        <View style={styles.buttons}>
          <SquareButton iconChildren={Magnifier} />
          <SquareButton iconChildren={MenuSvg} />
        </View>
      </View>

      <View style={styles.title}>
        <Text
          textDescription={'Find the NFT Perfect to You'}
          fontFamily={fontsFamily.montserrat.regular400}
          fontsSize={fontsSize.xl24}
          color={colors.light.neutralColor5}
        />
      </View>

      <View style={styles.filter}>
        <FilterList
          categories={categories}
          selectedCategory={category}
          setCategory={handleSelectCategory}
          textAlign={AlignTypes.CENTER}
          textColor={colors.light.neutralColor5}
          textFontFamily={fontsFamily.montserrat.semiBold600}
          textFontSize={fontsSize.sm14}
        />
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator color={colors.light.neutralColor6} size="large" />
        ) : (
          <FlatList
            data={nfts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Nft
                author={item.author}
                currency={item.currency}
                image={item.image}
                isLiked={item.isLiked}
                likes={item.likes}
                tags={item.tags}
                toggleLike={() => {
                  handleLikeImage(item.id);
                }}
                pressImageFunction={() => {}}
                value={item.value}
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ marginBottom: 25 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
