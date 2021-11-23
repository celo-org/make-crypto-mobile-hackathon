import React from 'react';
import { FlatList, View } from 'react-native';
import { SellTypesButton } from '@nft/components';
import { fontsFamily, fontsSize } from '@nft/styles';
import { AlignTypes } from '@nft/utils/enum';

interface IListProps {
  filterKey: string;
  title: string;
  icon: JSX.Element;
}

interface ISellTypesListProps {
  data: IListProps[];
  selectedSellType: string;
  setSellType: (param: string) => void;
}

const SellTypesList = ({ data, selectedSellType, setSellType }: ISellTypesListProps) => {
  return (
    <FlatList
      horizontal
      scrollEnabled={data.length > 3 ? true : false}
      data={data}
      keyExtractor={(item) => item.filterKey}
      renderItem={({ item }) => (
        <SellTypesButton
          Icon={item.icon}
          fontFamily={fontsFamily.montserrat.medium500}
          fontsSize={20}
          isActive={item.filterKey === selectedSellType}
          textAlign={AlignTypes.CENTER}
          title={item.title}
          onPress={() => setSellType(item.filterKey)}
        />
      )}
    />
  );
};

export default SellTypesList;
