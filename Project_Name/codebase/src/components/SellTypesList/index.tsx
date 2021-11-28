import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { SellTypesButton } from '@nft/components';
import { fontsFamily, fontsSize } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';
import styles from './styles';

interface IListProps {
  filterKey: string;
  title: string;
  icon: typeof React.Component;
}

interface ISellTypesListProps {
  data: IListProps[];
  selectedSellType: string;
  setSellType: (param: string) => void;
}

const SellTypesList = ({ data, selectedSellType, setSellType }: ISellTypesListProps) => {
  return (
    <SafeAreaView style={styles.list}>
      {data.map((item) => (
        <SellTypesButton
          key={item.filterKey}
          Icon={item.icon}
          fontFamily={fontsFamily.montserrat.medium500}
          fontsSize={fontsSize.xl20}
          isActive={item.filterKey === selectedSellType}
          textAlign={AlignTypes.CENTER}
          title={item.title}
          onPress={() => setSellType(item.filterKey)}
        />
      ))}
    </SafeAreaView>
  );
};

export default SellTypesList;
