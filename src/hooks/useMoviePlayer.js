// src/hooks/useMoviePlayer.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderService from '../services/OrderServices';

export const useMoviePlayer = (movieId) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
          navigate('/login');
          return;
        }

        // Check if user has purchased the movie
        const orderResponse = await OrderService.checkMovieOrderStatus(user.id, movieId);
        setIsOrdered(orderResponse.data);
        setError(null);
      } catch (err) {
        console.error('Access check error:', err);
        setError(err.response?.data?.message || 'Failed to check movie access');
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [movieId, navigate]);

  return { isOrdered, loading, error };
};