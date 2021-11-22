import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';

import { InputBid, LargeButton, Modal, Text } from '@nft/components';
import { colors, fontsFamily, fontsSize } from '@nft/styles';
import EtherBlack from '@nft/assets/ether-black-small.svg';
import { AlignTypes } from '@nft/utils/enum';
import { apiCoingeckoEthereumValue } from '@nft/services/api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import styles from './styles';
interface IModalPlaceABidProps {
  nftID?: string;
}

const ModalPlaceABid = ({ nftID }: IModalPlaceABidProps): JSX.Element => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ethereumCurrentValueUSD, setEthereumCurrentValueUSD] = useState(0);
  const [bidValueUsd, setBidValueUsd] = useState(0);

  const handleMakeABid = (text: string) => {
    setValue(text);
  };

  useEffect(() => {
    async function getDollarExchangedValue() {
      try {
        setIsLoading(true);
        const response = await apiCoingeckoEthereumValue.get('');
        const ethereumUSD = response.data.market_data.current_price.usd;

        setEthereumCurrentValueUSD(ethereumUSD);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getDollarExchangedValue();
  }, []);

  useEffect(() => {
    function exchangedUSDValue() {
      return setBidValueUsd(parseFloat(value) * ethereumCurrentValueUSD);
    }

    exchangedUSDValue();
  }, [value]);

  return (
    <Modal>
      <>
        {/* TODO Adicionar loading */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.heading}>
              <Text
                color={colors.light.neutralColor4}
                fontFamily={fontsFamily.montserrat.semiBold600}
                fontsSize={fontsSize.xl24}
                textDescription={'Place a bid'}
              />
            </View>
            <View style={styles.currentBalanceContainer}>
              <View style={styles.currentBidBalance}>
                <Text
                  color={colors.light.neutralColor7}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontsSize={fontsSize.sm14}
                  textDescription={'Current balance'}
                />
                <View style={styles.currentBid}>
                  <EtherBlack />
                  <View style={styles.currentBidValue}>
                    <Text
                      color={colors.light.neutralColor4}
                      fontFamily={fontsFamily.montserrat.regular400}
                      fontsSize={fontsSize.sm14}
                      textDescription={'0.08976589 '}
                    />
                  </View>
                  <Text
                    color={colors.light.neutralColor6}
                    fontFamily={fontsFamily.montserrat.regular400}
                    fontsSize={fontsSize.sm14}
                    textDescription={'ETH'}
                  />
                </View>
              </View>
              <View style={styles.currentUsdBalance}>
                <Text
                  color={colors.light.neutralColor6}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontsSize={fontsSize.xs12}
                  textDescription={`$ 12,908.98 USD`}
                />
              </View>
            </View>
            <View style={styles.yourBid}>
              <View style={styles.secondHeading}>
                <Text
                  color={colors.light.neutralColor4}
                  fontFamily={fontsFamily.montserrat.semiBold600}
                  fontsSize={fontsSize.xl24}
                  textDescription={'Your bid'}
                />
              </View>
              <InputBid
                currency={'ETH'}
                minimumBid={0.022}
                value={value}
                onChangeText={(text) => handleMakeABid(String(text))}
                valueFormatted={value === '' ? '0' : String(bidValueUsd)}
              />
            </View>
            <View style={styles.submitButton}>
              <LargeButton
                backgroundColor={colors.light.neutralColor4}
                label={'Submit'}
                textAlign={AlignTypes.CENTER}
                textColor={colors.light.neutralColor14}
                textFontFamily={fontsFamily.montserrat.semiBold600}
                textFontSize={fontsSize.md16}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    </Modal>
  );
};

export default ModalPlaceABid;
