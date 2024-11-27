// src/components/recommendations/RecommendationsGrid.jsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RecommendationsGrid.css';

const   RecommendationsGrid = ({ recommendations }) => {
  const navigate = useNavigate();

  if (!recommendations.length) {
    return (
      <div className="container text-center mt-4">
        <h3 className="text-muted">No recommendations available</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <Row className="g-4">
        {recommendations.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              className="recommendation-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="recommendation-image-wrapper">
                <Card.Img 
                  variant="top" 
                  src={movie.imageUrl} 
                  alt={movie.title}
                  className="recommendation-image"
                  onError={(e) => {
                    e.target.src = '/movie-placeholder.jpg';
                  }}
                />
                {movie.similarityScore && (
                  <div className="match-score">
                    {Math.round(movie.similarityScore * 100)}% Match
                  </div>
                )}
              </div>
              <Card.Body>
                <div className="recommendation-title">
                  {movie.title}
                </div>
                <div className="recommendation-metadata">
                  <span className="genre">{movie.Genre?.name}</span>
                  <span className="language">{movie.Language?.name}</span>
                </div>
                <div className="recommendation-price">
                  ${movie.cost.toFixed(2)}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RecommendationsGrid;