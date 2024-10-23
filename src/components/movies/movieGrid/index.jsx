import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './MovieGrid.css';

const MovieGrid = ({ movies, onAddToCart, onAddToFavorites }) => {
  if (!movies.length) {
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
            <Card className="movie-card">
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
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div 
                    className="movie-title-wrapper"
                    data-full-title={movie.title}
                  >
                    <Card.Title className="movie-title">
                      {movie.title}
                    </Card.Title>
                  </div>
                  <Card.Text className="movie-cost">
                    ${movie.cost.toFixed(2)}
                  </Card.Text>
                </div>
                <div className="d-flex gap-2 justify-content-between">
                  <Button 
                    variant="outline-primary" 
                    className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => onAddToCart && onAddToCart(movie)}
                  >
                    <FaShoppingCart /> Cart
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => onAddToFavorites && onAddToFavorites(movie)}
                  >
                    <FaHeart /> Favorite
                  </Button>
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