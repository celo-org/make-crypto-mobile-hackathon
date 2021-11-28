import React from 'react';
import { View } from 'react-native';
import styles from './styles';

import { Modal, Text, PillButton } from '@nft/components';
import { colors, fontsFamily, fontsSize } from '@nft/styles';

import Metamask from '../../../assets/metamask.svg';
import Trust from '../../../assets/trust-wallet.svg';
import Coinbase from '../../../assets/coinbase.svg';
import Celo from '../../../assets/celo.svg';

import { AlignTypes } from '@nft/utils/enum';
import { useWallet } from '@nft/context/wallet';

const ConnectWallet = (): JSX.Element => {
  const { connect } = useWallet();

  const handleConnect = () => {
    connect();
  };
  return (
    <Modal>
      <>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text
              color={colors.light.neutralColor4}
              fontFamily={fontsFamily.montserrat.semiBold600}
              fontsSize={fontsSize.xl24}
              textDescription={'Connect your wallet'}
            />
          </View>
          <View style={styles.description}>
            <Text
              textAlign={AlignTypes.CENTER}
              color={colors.light.neutralColor7}
              fontFamily={fontsFamily.montserrat.medium500}
              fontsSize={fontsSize.sm14}
              textDescription={`Connect with one of our available wallet providers or create a new one.`}
            />
          </View>
          <View>
            <View style={styles.pillButton}>
              <PillButton
                backgroundColor={colors.light.neutralColor4}
                label={'Celo'}
                textColor={colors.light.neutralColor12}
                textFontsSize={fontsSize.lg18}
                textFontFamily={fontsFamily.montserrat.regular400}
                iconChildren={Celo}
                onPress={() => handleConnect()}
              />
            </View>
            <View style={styles.pillButton}>
              <PillButton
                backgroundColor={colors.light.neutralColor4}
                label={'Trust'}
                textColor={colors.light.neutralColor12}
                textFontsSize={fontsSize.lg18}
                textFontFamily={fontsFamily.montserrat.regular400}
                iconChildren={Trust}
                textButtonDescription={'coming soon'}
                onPress={() => {}}
              />
            </View>
            <View style={styles.pillButton}>
              <PillButton
                backgroundColor={colors.light.neutralColor4}
                label={'Coinbase'}
                textColor={colors.light.neutralColor12}
                textFontsSize={fontsSize.lg18}
                textButtonDescription={'coming soon'}
                textFontFamily={fontsFamily.montserrat.regular400}
                iconChildren={Coinbase}
                onPress={() => {}}
              />
            </View>
            <View>
              <PillButton
                label={'Metamask'}
                backgroundColor={colors.light.neutralColor4}
                textColor={colors.light.neutralColor12}
                textFontsSize={fontsSize.lg18}
                iconChildren={Metamask}
                textButtonDescription={'coming soon'}
                textFontFamily={fontsFamily.montserrat.regular400}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </>
    </Modal>
  );
};

export default ConnectWallet;
