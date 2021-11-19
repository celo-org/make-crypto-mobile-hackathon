import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputProps, View } from 'react-native';
import { InputBid, LargeButton, Modal, Text } from '../../components';
import { colors, fontsFamily, fontsSize } from '../../styles';
import EtherBlack from '../../../assets/ether-black-small.svg';
import fontSizes from '../../styles/fontSizes';
import styles from './styles';
import { AlignTypes } from '../../utils/enum';

interface IPlaceABidProps {
  isModalVisible: boolean;
  setIsModalVisible: (param: boolean) => void;
  balance: string;
  cryptoPrefix: string;
  usdBalance: string;
  minimumBid: number;
}

const PlaceABid = ({
  isModalVisible,
  setIsModalVisible,
  balance,
  cryptoPrefix,
  usdBalance,
  minimumBid,
}: IPlaceABidProps): JSX.Element => {
  const [value, setValue] = useState('');

  return (
    <Modal modalVisible={isModalVisible} setModalVisible={setIsModalVisible}>
      <>
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
                fontsSize={fontSizes.md16}
                textDescription={'Current balance'}
              />
              <View style={styles.currentBid}>
                <EtherBlack />
                <View style={styles.currentBidValue}>
                  <Text
                    color={colors.light.neutralColor4}
                    fontFamily={fontsFamily.montserrat.regular400}
                    fontsSize={fontsSize.md16}
                    textDescription={balance}
                  />
                </View>
                <Text
                  color={colors.light.neutralColor6}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontsSize={fontSizes.md16}
                  textDescription={cryptoPrefix}
                />
              </View>
            </View>
            <View style={styles.currentUsdBalance}>
              <Text
                color={colors.light.neutralColor6}
                fontFamily={fontsFamily.montserrat.regular400}
                fontsSize={fontsSize.sm14}
                textDescription={`$ ${usdBalance} USD`}
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
              minimumBid={minimumBid}
              value={value}
              onChangeText={() => {}}
              valueFormatted={usdBalance}
            />
          </View>
          <View style={styles.submitButton}>
            <LargeButton
              backgroundColor={colors.light.neutralColor4}
              label={'Submit'}
              textAlign={AlignTypes.CENTER}
              textColor={colors.light.neutralColor14}
              textFontFamily={fontsFamily.montserrat.semiBold600}
              textFontSize={fontSizes.md16}
            />
          </View>
        </View>
      </>
    </Modal>
  );
};

export default PlaceABid;
