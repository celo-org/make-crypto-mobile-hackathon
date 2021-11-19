import React, { useState } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { Author, BidCard, LargeButton, Likes, SquareButton, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontsFamily } from '../../styles';
import fontSizes from '../../styles/fontSizes';

import Ether from '../../../assets/ether.svg';
import EtherBlack from '../../../assets/ether-black.svg';
import EtherBlackSmall from '../../../assets/ether-black-small.svg';
import Back from '../../../assets/left-arrow.svg';
import { AlignTypes } from '../../utils/enum';
import styles from './styles';
import ConnectWallet from '../ConnectWallet';
import PlaceABid from '../PlaceABid';
interface IDescriptionProps {
  image: {
    url: string;
    title: string;
    description: string;
  };
  author: {
    name: string;
    image: string;
  };
  currency: string;
  value: string;
  likes: number;
  isLiked: boolean;
}

const DescriptionNft = ({
  image,
  author,
  currency,
  value,
  likes,
  isLiked,
}: IDescriptionProps): JSX.Element => {
  const [isWalletModalVisible, setIsWalletModalVisible] = useState(false);
  const [isPlaceABidModalVisible, setIsPlaceABidModalVisible] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(true);

  const handleWalletModal = () => setIsWalletModalVisible((prevState) => !prevState);
  const handlePlaceABidModal = () => setIsPlaceABidModalVisible((prevState) => !prevState);

  const renderModal = isWalletConnected ? handlePlaceABidModal : handleWalletModal;

  return (
    <SafeAreaView style={styles.container}>
      <ConnectWallet
        isModalVisible={isWalletModalVisible}
        setIsModalVisible={setIsWalletModalVisible}
      />
      <PlaceABid
        isModalVisible={isPlaceABidModalVisible}
        setIsModalVisible={handlePlaceABidModal}
        cryptoPrefix={'ETH'}
        balance={'0.08976589'}
        usdBalance={'259.89'}
      />
      <View style={styles.head}>
        <SquareButton iconChildren={Back} onPress={() => {}} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View>
          <Image
            source={{
              uri: image.url,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text
              textDescription={image.title}
              color={colors.light.neutralColor3}
              fontFamily={fontsFamily.montserrat.semiBold600}
              fontsSize={fontSizes.lg18}
            />
            <Likes
              numberOfLikes={likes}
              likeFunction={() => {}}
              textAlign={AlignTypes.CENTER}
              textColor={colors.light.neutralColor5}
              textFontFamily={fontsFamily.montserrat.regular400}
              textFontSize={fontSizes.xs12}
              isLiked={isLiked}
            />
          </View>
          <View style={styles.author}>
            <Author
              authorImage={{
                uri: author.image,
              }}
              authorName={author.name}
            />
          </View>
          <View style={styles.description}>
            <Text
              textDescription={
                'This NFT can show you the most perfect creation of art and how we can appreciate the little things  of nature and creation as a whole.'
              }
              color={colors.light.neutralColor3}
              fontFamily={fontsFamily.montserrat.regular400}
              fontsSize={fontSizes.sm14}
            />
          </View>
          <View style={styles.detailsFooter}>
            <BidCard
              currency={'ETH'}
              smallIconChildren={EtherBlackSmall}
              largeIconChildren={EtherBlack}
              value={0.2}
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
            textFontSize={fontSizes.md16}
            iconChildren={Ether}
            onPress={renderModal}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DescriptionNft;
