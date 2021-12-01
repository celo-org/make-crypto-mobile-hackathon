//Importações Externas
import React, {useState} from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {generateBoxShadow} from '../../assets/utils/generateBoxShadow';
import {DetailTag} from './Tags/DetailTag';
import {InvestmentDetailModal} from '../Modals/InvestmentDetailModal';
import * as NavigationService from '../../navigation/NavigationService';

export const PortfolioInfoBanner = ({title, risk, type, pctg}) => {
  const [visible, setVisible] = useState(false);

  const handlePress = (boll) => {
    setVisible(boll);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handlePress(true)}>
        <View style={[styles.container, styles.boxShadow]}>
          <View>
            <Text style={styles.title} category="h6">
              {title}
            </Text>
            <View style={styles.tagContainer}>
              <DetailTag text={`${risk} Risk`} />
              <DetailTag text={type} />
            </View>
          </View>
          <View>
            <Text style={styles.tagSide}>{`${pctg}%`} </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <InvestmentDetailModal
          handleOnPress={handlePress}
          visible={visible}
          data={{pctg: pctg}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    paddingBottom: 8,
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  tagSide: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#CEDAFF',
    borderRadius: 8,
    color: '#005CFF',
    paddingTop: 12,
    paddingLeft: 8,
    paddingBottom: 12,
    paddingRight: 8,
  },
  boxShadow: generateBoxShadow(0, 0, '#000', 0.25, 3, 0, '#ffffff'),
});
