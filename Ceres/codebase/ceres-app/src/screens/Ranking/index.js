//Importações Externas
import React from 'react';

import {Layout, useTheme, Tab, TabView, Text} from '@ui-kitten/components';

import {StatusBar, Platform, Dimensions, ScrollView} from 'react-native';

//Importações Internas

import SafeAreaView from 'react-native-safe-area-view';

import NavSaldo from '../../components/NavSaldo';
import {Podium} from './Podium';
import {UserPosition} from './UserPosition';
import {RankedPosition} from './RankedPosition';
import {MyDataScreen} from '../mydata';

const vh = Dimensions.get('window').height * 0.01;

const data = [
  {name: 'Zezinho das Neves', gains: 5003.39},
  {name: 'Bebe Melão', gains: 5001.39},
  {name: 'Flash Gordon', gains: 5000.39},
  {name: 'Flash Gordon1', gains: 5000.39},
  {name: 'Flash Gordon2', gains: 5000.39},
  {name: 'Flash Gordon3', gains: 5000.39},
  {name: 'Flash Gordon4', gains: 5000.39},
  {name: 'Flash Gordon5', gains: 5000.39},
  {name: 'Flash Gordon6', gains: 5000.39},
  {name: 'Flash Gordon7', gains: 5000.39},
  {name: 'Flash Gordon8', gains: 5000.39},
  {name: 'Flash Gordon9', gains: 5000.39},
  {name: 'Flash Gordon10', gains: 5000.39},
];
const userData = {name: 'Programador', gains: -500.52, ranking: 2000};

export const RankingScreen = (props) => {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ScrollView>
      <Layout>
        {/* <NavSaldo /> */}
        <Layout>
              <Podium first={data[0]} second={data[1]} third={data[2]} />
              <UserPosition
                userName={userData.name}
                userGains={userData.gains}
                userRanking={userData.ranking}
              />

              {data.slice(3).map((d) => (
                <RankedPosition
                  key={data.indexOf(d)}
                  index={data.indexOf(d)}
                  name={d.name}
                  gains={d.gains}
                />
              ))}
            </Layout>
        {/* <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          <Tab title="Top Investidores">
            <Layout>
              <Podium first={data[0]} second={data[1]} third={data[2]} />
              <UserPosition
                userName={userData.name}
                userGains={userData.gains}
                userRanking={userData.ranking}
              />

              {data.slice(3).map((d) => (
                <RankedPosition
                  key={data.indexOf(d)}
                  index={data.indexOf(d)}
                  name={d.name}
                  gains={d.gains}
                />
              ))}
            </Layout>
          </Tab>
          <Tab title="Últimos prêmios">
            <Layout />
          </Tab>
        </TabView> */}
      </Layout>
    </ScrollView>
  );
};
