// src/components/movies/MovieGrid.jsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MovieGrid.css';

const MovieGrid = ({ movies = [] }) => {
  const navigate = useNavigate();

  if (!movies?.length) {
    return (
      <div className="container text-center mt-5">
        <h3>No movies found</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <Row className="g-4">
        {movies.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              className="movie-card-in-movie-grid"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="movie-image-wrapper-in-movie-grid">
                <Card.Img 
                  variant="top" 
                  src={movie.imageUrl} 
                  alt={movie.title}
                  className="movie-image-in-movie-grid"
                  onError={(e) => {
                    e.target.src = '/movie-placeholder.jpg';
                  }}
                />
              </div>
              <Card.Body>
                <div>
                    <div className="movie-title-in-movie-grid">
                      {movie.title}
                    </div>
                  <Card.Text className="movie-cost-in-movie-grid">
                    ${movie.cost.toFixed(2)}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieGrid;
