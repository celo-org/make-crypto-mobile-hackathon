import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface DescriptionProps {
  textDescription: string;
}

const Description = ({ textDescription }: DescriptionProps): JSX.Element => {
  return <Text style={styles.text}>{textDescription}</Text>;
};

export default Description;
