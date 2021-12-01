//Exportações Externas
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import {Divider, Layout} from '@ui-kitten/components';

//Importações Internas
import NavSaldo from '../../components/NavSaldo';
import HeaderTitle from '../../components/headertitle';
import IndicadorSaldo from '../../components/IndicadorSaldo';
import {ProgressBarTagBanner} from '../../components/Banners/ProgressBarTagBanner';
import Pie from '../../components/Graphs/Pie';
import {Toast} from '../../components/PopUp';
import getPoolBalances from '../../api/getPoolBalances';
import {availablePools} from '../../shared/liquidityPools';
import concat from 'async/concat';
//api

const data = {
  title: 'Portfolio',
  totalValue: 3000.195,
  investedValue: 1500,
  url: 'PoolWallet',
};

const InvestmentsScreen = ({navigation}) => {
  const user = useSelector((state) => state.userState);
  const mainWallet = user.wallets[0].address;
  const testWallet = '0x70E1D914a3C02E389aF5Eb0a11EdcC7d418AA27C';

  const [graphData, setGraphData] = useState([]);
  const [graphLoading, setGraphLoading] = useState(false);

  const getPoolBalance = (pool, callback) => {
    getPoolBalances(pool.address, mainWallet, pool.rewardsNumber)
      .then((balance) => {
        callback(null, handlePoolData(pool, balance));
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          title: 'Ocorreu um erro ao requisitar o seu saldo.',
          text: `Tivemos um erro ao requisitar as informações da pool ${pool.name} `,
          color: pool.color,
        });
        callback(error);
      });
  };

  const getAllPools = (pools) => {
    setGraphLoading(true);
    concat(pools, getPoolBalance, (error, results) => {
      if (error) {
        console.error(error);
        setGraphLoading(false);
      } else {
        setGraphLoading(false);
        setGraphData(results);
      }
    });
  };

  const handlePoolData = (pool, balance) => {
    return {
      name: pool.name,
      quantity: balance.data.userSupplyUsd,
      color: pool.color,
      legendFontColor: '#ff9800',
      legendFontSize: 15,
    };
  };

  useEffect(() => {
    getAllPools(availablePools, '0x70E1D914a3C02E389aF5Eb0a11EdcC7d418AA27C');
  }, []);

  useEffect(() => {
    console.log(graphData);
  }, [graphData]);

  return (
    <Layout>
      <NavSaldo />
      <ScrollView>
        <IndicadorSaldo />
        <Divider />
        <HeaderTitle title={'Resumo'} />
        <ProgressBarTagBanner {...data} />
        <Pie loading={graphLoading} data={graphData} />
      </ScrollView>
    </Layout>
  );
};

export default InvestmentsScreen;
