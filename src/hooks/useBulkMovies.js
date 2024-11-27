// src/hooks/useBulkMovies.js
import { useState, useEffect, useCallback } from 'react';
import MovieService from '../services/MovieServices';

export const useBulkMovies = (storageKey) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setIds(storedIds);
  }, [storageKey]);

  const fetchMovies = useCallback(async () => {
    if (ids.length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await MovieService.getMoviesByBulk(ids);
      setMovies(response.data);
    } catch (err) {
      setError('Failed to load movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [ids]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const removeMovie = useCallback((movieId) => {
    const newIds = ids.filter(id => id !== movieId);
    localStorage.setItem(storageKey, JSON.stringify(newIds));
    setIds(newIds);
  }, [ids, storageKey]);

  const moveToOtherList = useCallback((movieId, targetKey) => {
    // Remove from current list
    const newIds = ids.filter(id => id !== movieId);
    localStorage.setItem(storageKey, JSON.stringify(newIds));
    setIds(newIds);

    // Add to target list if not already present
    const targetIds = JSON.parse(localStorage.getItem(targetKey) || '[]');
    if (!targetIds.includes(movieId)) {
      const newTargetIds = [...targetIds, movieId];
      localStorage.setItem(targetKey, JSON.stringify(newTargetIds));
    }
  }, [ids, storageKey]);

  return { 
    movies, 
    loading, 
    error, 
    removeMovie,
    moveToOtherList,
    refetch: fetchMovies 
  };
};