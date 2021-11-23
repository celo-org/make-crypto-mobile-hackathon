import React from 'react';

import { Image } from 'react-native';

import { styles } from './styles';

interface INftImageProps {
  uri: string;
}

const NftImage = ({ uri }: INftImageProps): JSX.Element => {
  return <Image style={styles.container} source={{ uri: uri }} />;
};

export default NftImage;
