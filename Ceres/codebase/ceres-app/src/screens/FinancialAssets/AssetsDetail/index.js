//Importações Externas
import {Divider, Layout, Button, Text} from '@ui-kitten/components';

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

//Importações Internas
import {CustomHeader} from '../../../shared/customHeader';

export const FinancialAssetDetailScreen = (props) => {
  console.log(props.route.params);

  const {
    risk,
    title,
    origin,
    lastMonthsRentability,
    weeklyRentability,
    perfomanceFee,
    poolTotal,
    volume,
    numberOfInvestors,
    admnistrationFee,
    description,
  } = props.route.params;
  return (
    <SafeAreaView>
      <Layout>
        <CustomHeader title="Detalhes do Ativo" />
        <View style={styles.assetName}>
          <Text category="h6">{title}</Text>
          <Text category="s2">{origin}</Text>
        </View>
        <View style={styles.assetDetailLine}>
          <Text style={styles.description}>Nível de Risco</Text>
          <Text style={styles.data}>{`${risk} Risk`}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.assetDetailLine}>
          <Text>Rentabilidade (últimos 30dias) </Text>
          <Text style={styles.data}>{`${lastMonthsRentability}%`}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.assetDetailLine}>
          <Text>Rentabilidade Projetada(Semana)</Text>
          <Text style={styles.data}>{`${weeklyRentability}%`}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.assetDetailLine}>
          <Text>Taxa de administração</Text>
          <Text style={styles.data}>{`R$ ${admnistrationFee}`}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.assetDetailLine}>
          <Text>Taxa de performance (Rendimentos)</Text>
          <Text style={styles.data}>{`${perfomanceFee}%`}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.assetDetailLine}>
          <Text>Total Aportado na pool</Text>
          <Text style={styles.data}>{`R$ ${poolTotal}`}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.assetDetailLine}>
          <Text>Número de investidores</Text>
          <Text style={styles.data}>{numberOfInvestors}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.assetDetailLine}>
          <Text>Volume (24 hrs)</Text>
          <Text style={styles.data}>{`R$ ${volume}`}</Text>
        </View>
        <View style={styles.about}>
          <Text category="h6" style={styles.aboutTitle}>
            Sobre a Pool
          </Text>
          <Text category="s1" style={styles.aboutDescription}>
            {description}
          </Text>
        </View>
        <Button style={styles.addButton}> ADICIONAR À CARTEIRA </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  assetName: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 24,
    marginTop: 12,
    marginBottom: 36,
  },
  assetDetailLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 24,
    marginRight: 34,
    marginTop: 12,
    marginBottom: 12,
  },
  divider: {
    marginLeft: 24,
    marginRight: 24,
  },
  data: {
    fontWeight: 'bold',
  },
  about: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: 24,
    marginLeft: 24,
    marginRight: 16,
    marginBottom: 16,
  },
  aboutTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  addButton: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    marginBottom: 24,
  },
});
