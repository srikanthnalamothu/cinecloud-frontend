// src/hooks/useMovieDetails.js
import { useState, useEffect } from 'react';
import MovieService from '../services/MovieServices';
import OrderService from '../services/OrderServices';

export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        // Get user from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Fetch movie details and order status in parallel
        const [movieResponse, orderResponse] = await Promise.all([
          MovieService.getMovie(movieId),
          user ? OrderService.checkMovieOrderStatus(user.id, movieId) : Promise.resolve({ data: false })
        ]);

        setMovie(movieResponse.data);
        setIsOrdered(orderResponse.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return { movie, isOrdered, loading, error };
};