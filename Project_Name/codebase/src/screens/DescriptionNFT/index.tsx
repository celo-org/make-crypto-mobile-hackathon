import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/core';

import { Author, BidCard, LargeButton, Likes, SquareButton, Tag, Text } from '@nft/components';
import { colors, fontsFamily, fontsSize } from '@nft/styles';
import PlaceABid from '@nft/screens/ModalPlaceABid';
import ConnectWallet from '@nft/screens/ConnectWallet';

import Ether from '../../../assets/ether.svg';
import EtherBlack from '../../../assets/ether-black.svg';
import EtherBlackSmall from '../../../assets/ether-black-small.svg';
import Back from '../../../assets/left-arrow.svg';

import { AlignTypes } from '@nft/utils/enum';
import styles from './styles';
import { api } from '@nft/services/api';

interface INFTDescriptionResponse {
  nft: {
    author: {
      id: number;
      address: string;
      name: string;
      description: string;
      profilePicture: string;
    };
    description: string;
    favorite: boolean;
    favorite_count: number;
    id: number;
    image: string;
    last_bid: number;
    name: string;
    tags: string;
    value: number;
  };
  success: boolean;
}

const DescriptionNft = (): JSX.Element => {
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nftDescriptionResponse, setNftDescriptionResponse] = useState(
    {} as INFTDescriptionResponse,
  );

  const navigation = useNavigation();
  const { params } = useRoute();
  const user_id = 1;

  // const renderModal = isWalletConnected ? handlePlaceABidModal : handleWalletModal;

  useEffect(() => {
    const fetchNftDescription = async () => {
      try {
        console.log('entrou aqui de novo');
        setIsLoading(true);
        const response = await api.get(`/nft/details/${params}/${user_id}`);
        setNftDescriptionResponse(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log('entrou no erro');
        console.log(error);
      } finally {
      }
    };
    fetchNftDescription();
  }, [params]);

  const tagsSplited = nftDescriptionResponse.nft?.tags.split('|');

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <ConnectWallet />
          <PlaceABid />

          <View style={styles.head}>
            <SquareButton iconChildren={Back} onPress={() => navigation.goBack()} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View>
              <Image
                source={{
                  uri: nftDescriptionResponse.nft?.image,
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsHeader}>
                <Text
                  textDescription={nftDescriptionResponse.nft?.name}
                  color={colors.light.neutralColor3}
                  fontFamily={fontsFamily.montserrat.semiBold600}
                  fontsSize={fontsSize.lg18}
                />

                <View style={styles.containerTagsLike}>
                  {tagsSplited ? (
                    tagsSplited.map((item) => (
                      <Tag label={item} key={item} borderColor={colors.light.neutralColor5} />
                    ))
                  ) : (
                    <></>
                  )}

                  {/* TODO implementar a função de like e deslike */}
                  <View style={styles.likes}>
                    <Likes
                      numberOfLikes={nftDescriptionResponse.nft?.favorite_count}
                      likeFunction={() => {}}
                      textAlign={AlignTypes.CENTER}
                      textColor={colors.light.neutralColor5}
                      textFontFamily={fontsFamily.montserrat.regular400}
                      textFontSize={fontsSize.xs12}
                      isLiked={nftDescriptionResponse.nft?.favorite}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.author}>
                <Author
                  authorImage={{
                    uri: nftDescriptionResponse.nft?.author.profilePicture,
                  }}
                  authorName={nftDescriptionResponse.nft?.author.name}
                />
              </View>
              <View style={styles.description}>
                <Text
                  textDescription={nftDescriptionResponse.nft?.description}
                  color={colors.light.neutralColor3}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontsSize={fontsSize.sm14}
                />
              </View>
              <View style={styles.detailsFooter}>
                <BidCard
                  currency={'ETH'}
                  smallIconChildren={EtherBlackSmall}
                  largeIconChildren={EtherBlack}
                  value={nftDescriptionResponse.nft?.last_bid}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <LargeButton
                backgroundColor={colors.light.neutralColor5}
                label={'Place a bid'}
                textAlign={AlignTypes.CENTER}
                textColor={colors.light.neutralColor12}
                textFontFamily={fontsFamily.montserrat.semiBold600}
                textFontSize={fontsSize.md16}
                iconChildren={Ether}
                // TODO implementar a chamada do modal de place a bid ou connect wallet
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default DescriptionNft;
