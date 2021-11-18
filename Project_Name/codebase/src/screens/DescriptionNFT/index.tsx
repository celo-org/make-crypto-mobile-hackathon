import React from 'react';
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <SquareButton iconChildren={Back} onPress={() => {}} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View>
          <Image
            source={{
              uri: 'https://scontent.fcgh17-1.fna.fbcdn.net/v/t39.30808-6/252966841_6520614171347362_6887396726976868076_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=tQxCJ0BDSsYAX-D1p6v&_nc_ht=scontent.fcgh17-1.fna&oh=c6cef59b6f15db0d804f30fe3052e48c&oe=619923A1',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text
              textDescription={'The State of Art'}
              color={colors.light.neutralColor3}
              fontFamily={fontsFamily.montserrat.semiBold600}
              fontsSize={fontSizes.lg18}
            />
            <Likes
              numberOfLikes={50}
              likeFunction={() => {}}
              textAlign={AlignTypes.CENTER}
              textColor={colors.light.neutralColor5}
              textFontFamily={fontsFamily.montserrat.regular400}
              textFontSize={fontSizes.xs12}
            />
          </View>
          <View style={styles.author}>
            <Author
              authorImage={{
                uri: 'https://scontent.fcgh17-1.fna.fbcdn.net/v/t39.30808-6/241724541_6206440869431362_8806289142628707158_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=QCMR_2imDLIAX8EOUGt&_nc_ht=scontent.fcgh17-1.fna&oh=37fa9033ccc5cd28089a31e214c60d62&oe=619933C1',
              }}
              authorName={'Marcelo Barros'}
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
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DescriptionNft;
