//Importações Externas
import React from "react";
import { Text } from '@ui-kitten/components';
 
//Importações Internas
import { StyleSheet } from 'react-native'; 
import { generalStyle } from '../shared/generalStyle';

export const InfoParagraph = (props) => { 
  return(
    <Text style = {[generalStyle.paragraph, styles.infoParagraph, props.style]}>
      { props.content }
    </Text>
  )
}
 
const styles = StyleSheet.create({
  infoParagraph:{ 
    borderLeftWidth: 3,
    borderColor: '#0783FF', 
    paddingLeft: 16,
    marginLeft: 8,
    marginBottom: 24,
    paddingBottom: 0, 
    borderRadius: 3,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: 'rgba(7, 131, 255, 0.08)',
  }
});
 