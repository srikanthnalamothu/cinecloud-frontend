// src/hooks/useMovieActions.js
import { useState, useEffect } from 'react';

export const useMovieActions = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setCartItems(storedCart);
    setFavorites(storedFavorites);
  }, []);

  const handleCartAction = (movie) => {
    const newCartItems = cartItems.includes(movie.id)
      ? cartItems.filter(id => id !== movie.id)
      : [...cartItems, movie.id];
    
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const handleFavoritesAction = (movie) => {
    const newFavorites = favorites.includes(movie.id)
      ? favorites.filter(id => id !== movie.id)
      : [...favorites, movie.id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return {
    cartItems,
    favorites,
    handleCartAction,
    handleFavoritesAction
  };
};