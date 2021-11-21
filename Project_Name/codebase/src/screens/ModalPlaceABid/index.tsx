import React, { useState } from 'react';
import { View } from 'react-native';
import { InputBid, LargeButton, Modal, Text } from '../../components';
import { colors, fontsFamily, fontsSize } from '../../styles';
import EtherBlack from '../../../assets/ether-black-small.svg';
import fontSizes from '../../styles/fontSizes';
import styles from './styles';
import { AlignTypes } from '../../utils/enum';

interface IModalPlaceABidProps {
  isModalVisible: boolean;
  setIsModalVisible: (param: boolean) => void;
  nftID: string;
}

const ModalPlaceABid = ({
  isModalVisible,
  setIsModalVisible,
  nftID,
}: IModalPlaceABidProps): JSX.Element => {
  const [value, setValue] = useState('');

  const handleMakeABid = (valueBid: number) => {
    setValue(String(valueBid));
  };

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
                fontsSize={fontSizes.sm14}
                textDescription={'Current balance'}
              />
              <View style={styles.currentBid}>
                <EtherBlack />
                <View style={styles.currentBidValue}>
                  <Text
                    color={colors.light.neutralColor4}
                    fontFamily={fontsFamily.montserrat.regular400}
                    fontsSize={fontSizes.sm14}
                    textDescription={'0.08976589 '}
                  />
                </View>
                <Text
                  color={colors.light.neutralColor6}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontsSize={fontSizes.sm14}
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
              onChangeText={(text) => handleMakeABid(text)}
              valueFormatted={'1290898'}
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

export default ModalPlaceABid;
