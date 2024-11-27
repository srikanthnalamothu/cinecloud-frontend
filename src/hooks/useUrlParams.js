// src/hooks/useUrlParams.js
import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genreId') || '');
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get('languageId') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const updateUrlParams = useCallback((updates) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      const currentSearch = params.get('search');
      const currentGenreId = params.get('genreId');
      const currentLanguageId = params.get('languageId');

      params.delete('genreId');
      params.delete('languageId');
      params.delete('search');

      const newParams = {
        genreId: currentGenreId,
        languageId: currentLanguageId,
        search: currentSearch,
        ...updates
      };

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      return params;
    });
  }, [setSearchParams]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      updateUrlParams({ search: query });
    }, 500),
    [updateUrlParams]
  );

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value);
    updateUrlParams({ genreId: value });
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setSelectedLanguage(value);
    updateUrlParams({ languageId: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return {
    selectedGenre,
    selectedLanguage,
    searchQuery,
    handleGenreChange,
    handleLanguageChange,
    handleSearchChange
  };
};