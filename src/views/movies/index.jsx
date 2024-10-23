import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import MovieFilter from '../../components/movies/movieFilter';
import MovieGrid from '../../components/movies/movieGrid';
import MovieService from '../../services/MovieServices';
import GenreService from '../../services/GenreServices';
import LanguageService from '../../services/LanguageServices';
import './Movies.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get initial values from URL params
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genreId') || '');
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get('languageId') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      updateUrlParams({ search: query });
    }, 500),
    []
  );

  // Helper function to update URL params while preserving existing ones
  const updateUrlParams = (updates) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      const currentSearch = params.get('search');
      const currentGenreId = params.get('genreId');
      const currentLanguageId = params.get('languageId');

      // Clear all params to maintain consistent order
      params.delete('genreId');
      params.delete('languageId');
      params.delete('search');

      // Add back parameters with updates
      const newParams = {
        genreId: currentGenreId,
        languageId: currentLanguageId,
        search: currentSearch,
        ...updates
      };

      // Only set params that have values
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      return params;
    });
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [genresRes, languagesRes] = await Promise.all([
          GenreService.getGenres(),
          LanguageService.getLanguages()
        ]);
        setGenres(genresRes.data);
        setLanguages(languagesRes.data);
      } catch (err) {
        setError('Failed to load filters');
      }
    };
    fetchInitialData();
  }, []);

  // Fetch movies when filters change
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const params = {
          genreId: selectedGenre,
          languageId: selectedLanguage,
          search: searchQuery
        };
        const response = await MovieService.getMoviesByFilters(params);
        setMovies(response.data);
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, selectedLanguage, searchQuery]);

  // Update URL and trigger search when filters change
  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) params.set('genreId', value);
      else params.delete('genreId');
      return params;
    });
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setSelectedLanguage(value);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value) params.set('languageId', value);
      else params.delete('languageId');
      return params;
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="movies-container">
      <MovieFilter
        genres={genres}
        languages={languages}
        selectedGenre={selectedGenre}
        selectedLanguage={selectedLanguage}
        searchQuery={searchQuery}
        onGenreChange={handleGenreChange}
        onLanguageChange={handleLanguageChange}
        onSearchChange={handleSearchChange}
      />
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
};

export default Movies;