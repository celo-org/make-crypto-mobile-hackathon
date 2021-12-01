import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Modal, Text} from '@ui-kitten/components';
import {Slider} from '@miblanchard/react-native-slider';

export const InvestmentDetailModal = ({handleOnPress, visible, data}) => {
  const [percentage, setPercentage] = useState(data.pctg);

  const handleSlider = (value) => {
    console.log(value, typeof value);
    setPercentage(value[0]);
  };

  return (
    <View>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => handleOnPress(false)}>
        <Card disabled={true}>
          <Text category="h6">Nome do Investimento</Text>
          <View style={styles.progressView}>
            <Text category="s2" style={styles.progressBarText}>
              Porcentagem na carteira:
            </Text>
            <View style={styles.progressContainer}>
              <Slider
                maximumTrackTintColor="#EBF2FF"
                minimumTrackTintColor="#005CFF"
                value={percentage}
                maximumValue={100}
                onValueChange={handleSlider}
              />
              <Text>{`${percentage.toFixed(2)}%`}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button size="small">25%</Button>
            <Button size="small">50%</Button>
            <Button size="small">75%</Button>
            <Button size="small">100%</Button>
          </View>
          <Button
            style={styles.saveButton}
            onPress={() => handleOnPress(false)}>
            SALVAR
          </Button>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  saveButton: {
    marginTop: 70,
  },
});
