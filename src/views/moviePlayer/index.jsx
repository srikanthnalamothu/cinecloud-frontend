// src/views/moviePlayer/MoviePlayer.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaLock, FaShoppingCart } from 'react-icons/fa';
import { useMoviePlayer } from '../../hooks/useMoviePlayer';
import LoadingSpinner from '../../components/shared/loadingSpinner';
import ErrorMessage from '../../components/shared/errorMessage';
import './MoviePlayer.css';

const MoviePlayer = () => {
  const { id } = useParams();
  const { isOrdered, loading, error } = useMoviePlayer(id);

  const videoUrl = `http://ec2-18-118-140-9.us-east-2.compute.amazonaws.com:3200/movies/${id}/play`;

  if (loading) return <LoadingSpinner />;

  if (!isOrdered) {
    return (
      <div className="player-container access-denied">
        <div className="access-denied-content">
          <FaLock className="lock-icon" />
          <h2>Purchase Required</h2>
          <p>You need to purchase this movie to watch it.</p>
          <Link to={`/movie/${id}`}>
            <Button variant="danger" size="lg" className="purchase-button">
              <FaShoppingCart className="me-2" />
              Go to Purchase Page
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="player-container">
      <video 
        controls 
        autoPlay
        className="video-player"
      >
        <source 
          src={`${videoUrl}`} 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MoviePlayer;