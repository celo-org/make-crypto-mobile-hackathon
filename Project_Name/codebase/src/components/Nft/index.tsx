import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Author, BidCard, Likes, Tag, Text } from '..';
import { colors, fontsFamily, fontsSize } from '../../styles';
import { AlignTypes } from '../../utils/enum';
import EtherBlackSmallSvg from '../../../assets/ether-black-small.svg';
import EtherBlackSvg from '../../../assets/ether-black.svg';

import styles from './styles';

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
  value: number;
}

const Nft = ({
  image,
  author,
  currency,
  likes,
  toggleLike,
  isLiked = false,
  tags,
}: INftProps): JSX.Element => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{
          uri: image.url,
        }}
        style={styles.NftImage}
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text
            textDescription={image.title}
            fontFamily={fontsFamily.montserratAlternates.semiBold600}
            fontsSize={fontsSize.md16}
            color={colors.light.neutralColor3}
          />
          <View style={styles.cardDetails}>
            <View style={styles.tagContainer}>
              {tags.map((tag, index) => {
                <Tag
                  key={`tag${index}`}
                  label={tag}
                  borderColor={colors.light.neutralColor5}
                  color={colors.light.neutralColor5}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontSize={fontsSize.xxs10}
                  textAlign={AlignTypes.LEFT}
                />;
              })}
            </View>
            <Likes
              likeFunction={toggleLike}
              numberOfLikes={likes}
              textFontSize={12}
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
              value={image.value}
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
