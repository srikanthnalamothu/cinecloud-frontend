import { useState, useEffect } from 'react';
import MovieService from '../services/MovieServices';
import GenreService from '../services/GenreServices';
import LanguageService from '../services/LanguageServices';

export const useMovieData = (selectedGenre, selectedLanguage, searchQuery) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const params = { genreId: selectedGenre, languageId: selectedLanguage, search: searchQuery };
        const response = await MovieService.getMoviesByFilters(params);
        setMovies(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, selectedLanguage, searchQuery]);

  return { movies, genres, languages, loading, error };
};