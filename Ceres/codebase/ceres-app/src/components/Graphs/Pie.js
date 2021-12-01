import React from 'react';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Text, Spinner} from '@ui-kitten/components';
import {DotLegend} from './utils/DotLengend';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Pie = ({data, loading}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text category="h6" style={styles.title}>
        Resumo da sua carteira
      </Text>
      <Text category="s1" style={styles.description}>
        Ativos mostrados por tamanho na carteira
      </Text>
      {loading ? (
        <View style={styles.loading}>
          <Spinner size="giant" />
        </View>
      ) : (
        <PieChart
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          accessor={'quantity'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[screenWidth / 9, 0]}
          hasLegend={false}
          absolute
        />
      )}

      <View style={styles.legend}>
        {data.map((d) => {
          if (d.quantity > 0) {
            return <DotLegend key={d.name} name={d.name} color={d.color} />;
          }
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#EBEBEB',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 96,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 18,
  },
  title: {
    fontWeight: 'bold',
    marginRight: 'auto',
    marginBottom: 8,
  },
  loading: {
    margin: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legend: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
});

export default Pie;
