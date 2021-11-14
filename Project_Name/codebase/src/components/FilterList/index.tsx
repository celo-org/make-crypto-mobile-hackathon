import React from 'react';

import { View, FlatList } from 'react-native';
import { AlignTypes } from '../../utils/enum';
import FilterButton from '../FilterButton';

import { styles } from './styles';

interface IListProps {
  filterKey: string;
  title: string;
}

interface IFilterListProps {
  categories: IListProps[];
  selectedCategory: string;
  setCategory: (categoryKey: string) => void;
  textColor: string;
  textFontFamily: string;
  textFontSize: number;
  textAlign: AlignTypes;
}

const FilterList = ({
  categories,
  selectedCategory,
  setCategory,
  textColor,
  textFontFamily,
  textFontSize,
  textAlign,
}: IFilterListProps): JSX.Element => {
  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.filterKey}
        renderItem={({ item }) => (
          <FilterButton
            title={item.title}
            active={item.filterKey === selectedCategory}
            onPress={() => setCategory(item.filterKey)}
            textColor={textColor}
            textFontFamily={textFontFamily}
            textFontSize={textFontSize}
            textAlign={textAlign}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{ marginRight: 32 }}
      />
    </View>
  );
};

export default FilterList;
