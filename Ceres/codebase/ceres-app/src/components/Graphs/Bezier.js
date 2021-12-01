import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Button, ButtonGroup, Layout} from '@ui-kitten/components';

const possiblePeriods = ['1H', '1D', '1W', '1M', '1Y', 'All'];
const yearData = {
  datasets: [
    {
      data: [100, 200, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
    },
  ],
};
const dayData = {
  datasets: [
    {
      data: [
        0,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        110,
        120,
        130,
        140,
        150,
        160,
        170,
        180,
        190,
        200,
        210,
        220,
        230,
        240,
      ],
    },
  ],
};

const weekData = {
  datasets: [
    {
      data: [100, 101, 102, 103, 104, 105,106],
    },
  ],
};

const monthData = {
  datasets: [
    {
      data: [1, 3, 5, 7, 9, 11, 13, 15, 1, 3, 5, 7, 9, 11, 13, 15],
    },
  ],
};

const Bezier = (props) => {
  const [period, setPeriod] = useState('1Y');
  const [graphData, setGraphData] = useState(yearData);

  useEffect(() => {
    switch (period) {
      case '1Y':
        setGraphData(yearData);
        break;
      case '1D':
        setGraphData(dayData);
        break;
      case '1W':
        setGraphData(weekData);
        break;
      case '1M':
        setGraphData(monthData);
        break;
      default:
        setGraphData(yearData);
    }
  }, [period]);

  const handlePress = (p) => {
    setPeriod(p);
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={graphData}
        width={Dimensions.get('window').width + 125} // from react-native
        height={220} // optional, defaults to 1
        fromZero={true}
        withHorizontalLabels={false}
        withVertiacllLabels={false}
        chartConfig={{
          backgroundColor: '#1BD665',
          fillShadowGradientOpacity: 0.5,
          backgroundGradientFrom: '#FBFBFB',
          backgroundGradientTo: '#FCFCFC',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(27,214, 101, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(27, 214, 101, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            opacity: '0',
          },
          strokeWidth: 5,
        }}
        bezier
        style={styles.lineChart}
      />
      <ButtonGroup style={styles.buttonGroup} status="control">
        {possiblePeriods.map((p) => (
          <Button onPress={() => handlePress(p)}>{p}</Button>
        ))}
      </ButtonGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonGroup: {
    margin: 2,
  },
  lineChart: {
    marginVertical: 8,
  },
});

export default Bezier;
