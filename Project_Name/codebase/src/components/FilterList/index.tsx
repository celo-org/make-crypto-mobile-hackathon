import React from 'react';

import { View, FlatList } from 'react-native';
import { AlignTypes } from '../../utils/enum';
import FilterButton from '../FilterButton';

import { styles } from './styles';

interface IListProps {
  key: string;
  title: string;
}

interface IFilterListProps {
  tags: IListProps[];
  selectedCategory: string;
  setCategory: (tagKey: string) => void;
  textColor: string;
  textFontFamily: string;
  textFontSize: number;
  textAlign: AlignTypes;
}

const FilterList = ({
  tags,
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
        data={tags}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => (
          <FilterButton
            title={item.title}
            active={item.key === selectedCategory}
            onPress={() => setCategory(item.key)}
            textColor={textColor}
            textFontFamily={textFontFamily}
            textFontSize={textFontSize}
            textAlign={textAlign}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagList}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{ marginRight: 32 }}
      />
    </View>
  );
};

export default FilterList;
