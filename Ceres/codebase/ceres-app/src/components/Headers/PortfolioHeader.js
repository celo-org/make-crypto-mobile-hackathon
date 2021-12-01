//Exportações Externas
import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {Icon, TopNavigationAction} from '@ui-kitten/components';
import test from '../../assets/images/documentsBG.png';
//Importações Internas
import {goBack} from '../../navigation/NavigationService';
const BackIcon = (props) => <Icon {...props} name="arrow-back" color='#005CFF' />;

const PortfolioHeader = () => {
  const navigateBack = () => {
    goBack();
  };
  const BackAction = () => (
    <TopNavigationAction
      style={styles.backAction}
      icon={BackIcon}
      onPress={navigateBack}
    />
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={test} style={styles.imageBackground}>
        <BackAction />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  backAction: {
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginLeft: 24,
    marginTop: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: 150,
  },
});

export default PortfolioHeader;
