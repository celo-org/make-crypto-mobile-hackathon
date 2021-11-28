import React from 'react';
import SelectSearch, { fuzzySearch } from 'react-select-search/dist/cjs';

export const CustomSelectSearch = ({
  value,
  options,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <SelectSearch
        search
        options={options}
        value={value}
        filterOptions={fuzzySearch}
        closeOnSelect
        onChange={onChange}
        placeholder={placeholder}
        className={(c) => {
          if (c === 'container') {
            return 'relative w-full';
          }
          if (c === 'input') {
            return 'input w-full';
          }
          if (c === 'value') {
            return '';
          }
          if (c === 'select') {
            return 'z-50 absolute top-10 rounded-md shadow-md w-64';
          }
          if (c === 'option') {
            return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-3 hover:bg-gray-200 dark:hover:bg-gray-750 w-full text-left text-sm';
          }
        }}
      />
    </>
  );
};
