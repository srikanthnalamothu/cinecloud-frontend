import React from 'react';
import MovieFilter from '../../components/movies/movieFilter';
import MovieGrid from '../../components/movies/movieGrid';
import LoadingSpinner from '../../components/shared/loadingSpinner';
import ErrorMessage from '../../components/shared/errorMessage';
import { useUrlParams } from '../../hooks/useUrlParams';
import { useMovieData } from '../../hooks/useMovieData';
import { useMovieActions } from '../../hooks/useMovieActions';
import './Movies.css';

const Movies = () => {
  const {
    selectedGenre,
    selectedLanguage,
    searchQuery,
    handleGenreChange,
    handleLanguageChange,
    handleSearchChange
  } = useUrlParams();

  const {
    movies,
    genres,
    languages,
    loading,
    error
  } = useMovieData(selectedGenre, selectedLanguage, searchQuery);

  const {
    cartItems,
    favorites,
    handleCartAction,
    handleFavoritesAction
  } = useMovieActions();

  if (error) return <ErrorMessage message={error} />;

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
        <LoadingSpinner />
      ) : (
        <MovieGrid 
          movies={movies}
          cartItems={cartItems}
          favorites={favorites}
          onCartAction={handleCartAction}
          onFavoritesAction={handleFavoritesAction}
        />
      )}
    </div>
  );
};

export default Movies;