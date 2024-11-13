// src/views/movie/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaPlay } from 'react-icons/fa';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { useMovieActions } from '../../hooks/useMovieActions';
import LoadingSpinner from '../../components/shared/loadingSpinner';
import ErrorMessage from '../../components/shared/errorMessage';
import './Movie.css';

const Movie = () => {
  const { id } = useParams();
  const { movie, isOrdered, loading, error } = useMovieDetails(id);
  const { cartItems, favorites, handleCartAction, handleFavoritesAction } = useMovieActions();
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Movie not found" />;

  const handlePlay = () => {
    window.open(`/movie/${id}/play`, '_blank');
  };

  const isInCart = cartItems.includes(movie.id);
  const isInFavorites = favorites.includes(movie.id);

  return (
    <div className="movie-details-container">
      <Container>
        <Row>
          <Col md={4}>
            <div className="movie-poster">
              <img 
                src={movie.imageUrl} 
                alt={movie.title}
                onError={(e) => {
                  e.target.src = '/movie-placeholder.jpg';
                }}
              />
            </div>
          </Col>
          <Col md={8}>
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <p className="movie-description">{movie.description}</p>
              
              <div className="movie-metadata">
                <div className="metadata-item">
                  <span className="label">Release Date:</span>
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="metadata-item">
                  <span className="label">Duration:</span>
                  <span>{movie.duration} minutes</span>
                </div>
                <div className="metadata-item">
                  <span className="label">Price:</span>
                  <span>${movie.cost.toFixed(2)}</span>
                </div>
              </div>

              <div className="movie-actions">
                {isOrdered ? (
                  <Button 
                    variant="success" 
                    size="lg"
                    onClick={handlePlay}
                    className="play-button"
                  >
                    <FaPlay /> Play Movie
                  </Button>
                ) : (
                  <>
                    { user && <Button
                      variant={isInCart ? "danger" : "primary"}
                      onClick={() => handleCartAction(movie)}
                      className="action-button"
                    >
                      <FaShoppingCart />
                      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </Button>}
                    <Button
                      variant={isInFavorites ? "danger" : "outline-danger"}
                      onClick={() => handleFavoritesAction(movie)}
                      className="action-button"
                    >
                      <FaHeart />
                      {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;