/* eslint-disable import/prefer-default-export */
import Fuse from 'fuse.js';
import { useState } from 'react';

const fuzzySearch = ({ fuse, data, searchTerm }) => {
  const results = fuse.search(searchTerm);

  return searchTerm ? results : data;
};

export const useFuzzySearch = ({ data, fuzzyOptions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const fuseOptions = {
    threshold: 0.3,
    ...fuzzyOptions,
  };

  const fuse = new Fuse(data, fuseOptions);

  const results = fuzzySearch({ data, searchTerm, fuse });

  const searchResults = results.map((result) => result.item);

  const fuzzyReset = () => setSearchTerm('');

  return { searchResults, setSearchTerm, searchTerm, fuzzyReset };
};
