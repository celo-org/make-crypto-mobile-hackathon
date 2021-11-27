import React, { useCallback, useEffect, useState } from 'react';

import { View, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { FilterList, Nft, SquareButton, Text } from '@nft/components';
import { colors, dimensions, fontsFamily, fontsSize } from '@nft/styles';
import { AlignTypes, RoutesNames } from '@nft/utils/enum';

import MenuSvg from '../../../assets/menu.svg';
import Magnifier from '../../../assets/magnifier.svg';

import { api } from '@nft/services/api';

interface INFTProps {
  id: number;
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

  const navigate = useNavigation();

  const categories = [
    { filterKey: 'trending', title: 'Trending' },
    { filterKey: 'gamming', title: 'Gamming' },
    { filterKey: 'sports', title: 'Sports' },
    { filterKey: 'most_recent', title: 'Most Recent' },
  ];

  const handleSelectCategory = (category: string) => {
    setCategory(category);
  };

  const handleLikeImage = async (id: number) => {
    const request = {
      nft_id: id,
      user_id: 1, // TODO remove mock
    };
    await api
      .put('nft/favorite', request)
      .then((response) => {
        const isLike = response.data.message.includes('adicionar');

        if (isLike) {
          const nftLiked: INFTProps[] = nfts.map((nft) => {
            if (nft.id === id) {
              return {
                ...nft,
                likes: nft.likes + 1,
                isLiked: true,
              };
            } else {
              return nft;
            }
          });
          setNfts(nftLiked);
        } else if (!isLike) {
          const nftLiked: INFTProps[] = nfts.map((nft) => {
            if (nft.id === id) {
              return {
                ...nft,
                likes: nft.likes - 1,
                isLiked: false,
              };
            } else {
              return nft;
            }
          });
          setNfts(nftLiked);
        } else {
          Alert.alert('Ops! There was a problem', 'Please try again later.');
        }
      })
      .catch((error) => {
        Alert.alert('Ops! There was a problem', 'Please try again later.');
      });
  };

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

  useEffect(() => {
    fetchNft();
  }, [category]);

  useFocusEffect(
    useCallback(() => {
      fetchNft();
    }, [category]),
  );

  useEffect(() => {
    setCategory(categories[0].filterKey);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo} />
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
                pressImageFunction={() => navigate.navigate(RoutesNames.DESCRIPTION_NFT, item.id)}
                value={item.value}
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{ marginBottom: dimensions.spacingStackGiant25 }} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
