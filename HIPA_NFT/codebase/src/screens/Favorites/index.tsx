import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, View } from 'react-native';

import HipaLogoSVG from '../../../assets/hipa-logo.svg';
import HIPASVG from '../../../assets/HIPA.svg';

import { LineButton, Nft, SquareButton, Text } from '@nft/components';
import { colors, dimensions, fontsFamily, fontsSize } from '@nft/styles';

import { styles } from './styles';
import { AlignTypes, RoutesNames } from '@nft/utils/enum';

import MenuSvg from '../../../assets/menu.svg';
import Magnifier from '../../../assets/magnifier.svg';
import EmptyFavorites from '../../../assets/empty-favorites.svg';

import { api } from '@nft/services/api';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from '@nft/context/auth';

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
  const [nfts, setNfts] = useState<INFTProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('0');

  const navigate = useNavigation();

  const { user } = useAuth();

  const handleLikeImage = async (id: number) => {
    const request = {
      nft_id: id,
      user_id: user.id,
    };
    await api
      .put('nft/favorite', request)
      .then(() => {
        const newNftArray = nfts.filter((item, i) => item.id !== id);
        setNfts(newNftArray);
      })
      .catch(() => {
        Alert.alert('Ops! There was a problem', 'Please try again later.');
      });
  };

  async function fetchNft() {
    try {
      setIsLoading(true);
      const response = await api.get(`user/getFavorites/${user.id}`);
      setNfts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNft();
    if (user.id) {
      setUserId(user.id);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNft();
      if (user.id) {
        setUserId(user.id);
      }
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <HipaLogoSVG />
          <View style={styles.divider} />
          <HIPASVG />
        </View>
        <View style={styles.buttons}>
          <SquareButton iconChildren={Magnifier} />
          <SquareButton iconChildren={MenuSvg} />
        </View>
      </View>

      <View style={styles.title}>
        <Text
          color={colors.light.neutralColor5}
          fontFamily={fontsFamily.montserrat.semiBold600}
          fontsSize={fontsSize.xl20}
          textDescription={'Favorites'}
        />
      </View>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator color={colors.light.neutralColor6} size="large" />
        ) : nfts.length !== 0 ? (
          <FlatList
            data={nfts}
            keyExtractor={(item) => item.id}
            extraData={nfts}
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
        ) : (
          <View style={styles.emptyFavorites}>
            <View style={styles.emptyFavoritesImage}>
              <EmptyFavorites />
            </View>
            <View style={styles.emptyFavoritesText}>
              <Text
                textDescription={"You don't have a favorite NFT yet."}
                fontFamily={fontsFamily.montserrat.medium500}
                fontsSize={fontsSize.md16}
                color={colors.light.neutralColor5}
                textAlign={AlignTypes.CENTER}
              />
              <Text
                textDescription={'Look the home page to find the art perfect to you.'}
                fontFamily={fontsFamily.montserrat.medium500}
                fontsSize={fontsSize.md16}
                color={colors.light.neutralColor5}
                textAlign={AlignTypes.CENTER}
              />
            </View>
            <View>
              <LineButton
                onPress={() => navigate.navigate(RoutesNames.HOME_NFT)}
                label={'Find a NFT'}
                textFontFamily={fontsFamily.montserrat.medium500}
                textColor={colors.light.neutralColor4}
                textFontSize={fontsSize.md16}
                textAlign={AlignTypes.CENTER}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
