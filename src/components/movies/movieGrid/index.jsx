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
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="movie-image-wrapper">
                <Card.Img 
                  variant="top" 
                  src={movie.imageUrl} 
                  alt={movie.title}
                  className="movie-image"
                  onError={(e) => {
                    e.target.src = '/movie-placeholder.jpg';
                  }}
                />
              </div>
              <Card.Body>
                <div>
                  <div className="movie-title-wrapper" data-full-title={movie.title}>
                    <Card.Title className="movie-title">
                      {movie.title}
                    </Card.Title>
                  </div>
                  <Card.Text className="movie-cost">
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
