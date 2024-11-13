// src/views/favorites/Favorites.jsx
import React from 'react';
import { useBulkMovies } from '../../hooks/useBulkMovies';
import LoadingSpinner from '../../components/shared/loadingSpinner';
import ErrorMessage from '../../components/shared/errorMessage';
import './Favorites.css';
import MovieList from '../../components/movies/movieList';

const Favorites = () => {
  const { movies, loading, error, removeMovie, moveToOtherList } = useBulkMovies('favorites');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const handleMoveToCart = (movieId) => {
    moveToOtherList(movieId, 'cart');
  };

  return (
    <div className="favorites-container">
      <h2 className="page-title" style={{ marginBottom: '20px'}}>My Favorites</h2>
      <MovieList
        movies={movies}
        onRemove={removeMovie}
        onMove={handleMoveToCart}
        emptyMessage="No favorites added yet"
        removeButtonText="Remove from Favorites"
        isCart={false}
      />
    </div>
  );
};

export default Favorites;