import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface IDescriptionProps {
  textDescription: string;
}

const Description = ({ textDescription }: IDescriptionProps): JSX.Element => {
  return <Text style={styles.text}>{textDescription}</Text>;
};

export default Description;
