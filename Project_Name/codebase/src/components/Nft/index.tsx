import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Author, BidCard, Likes, Tag, Text } from '@nft/components';
import { colors, fontsFamily, fontsSize } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import EtherBlackSmallSvg from '../../../assets/ether-black-small.svg';
import EtherBlackSvg from '../../../assets/ether-black.svg';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

interface INftProps {
  author: {
    name: string;
    image: string;
  };
  currency: string;
  image: {
    url: string;
    title: string;
  };
  isLiked: boolean;
  likes: number;
  tags: string[];
  toggleLike: () => void;
  pressImageFunction: () => void;
  value: number;
}

const Nft = ({
  image,
  author,
  currency,
  likes,
  toggleLike,
  pressImageFunction,
  isLiked = false,
  tags,
  value,
}: INftProps): JSX.Element => {
  return (
    <View style={styles.card}>
      <RectButton onPress={pressImageFunction}>
        <ImageBackground
          source={{
            uri: image.url,
          }}
          style={styles.NftImage}
        />
      </RectButton>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text
            textDescription={image.title}
            fontFamily={fontsFamily.montserrat.semiBold600}
            fontsSize={fontsSize.md16}
            color={colors.light.neutralColor3}
          />
          <View style={styles.cardDetails}>
            <View style={styles.tagContainer}>
              {tags.map((tag, index) => {
                return (
                  <Tag key={`tag${index}`} label={tag} borderColor={colors.light.neutralColor5} />
                );
              })}
            </View>
            <Likes
              likeFunction={toggleLike}
              numberOfLikes={likes}
              textFontSize={fontsSize.xs12}
              textAlign={AlignTypes.CENTER}
              textColor={colors.light.neutralColor6}
              textFontFamily={fontsFamily.montserrat.medium500}
              isLiked={isLiked}
            />
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Author authorImage={{ uri: author.image }} authorName={author.name} />
          <View>
            <BidCard
              value={value}
              currency={currency}
              smallIconChildren={EtherBlackSmallSvg}
              largeIconChildren={EtherBlackSvg}
              small
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Nft;
