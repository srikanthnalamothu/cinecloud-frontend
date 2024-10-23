import React from 'react';
import { Form } from 'react-bootstrap';
import './MovieFilter.css';

const MovieFilter = ({ 
  genres, 
  languages, 
  selectedGenre, 
  selectedLanguage, 
  searchQuery,
  onGenreChange, 
  onLanguageChange,
  onSearchChange 
}) => {
  return (
    <div className="container mb-4">
      <div className="row align-items-center">
        <div className="col-md-3">
          <h2 className="movies-heading mb-0">Movies</h2>
        </div>
        <div className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={onSearchChange}
            className="search-input"
          />
        </div>
        <div className="col-md-3">
          <Form.Select 
            value={selectedGenre} 
            onChange={onGenreChange}
            className="filter-select"
          >
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-md-3">
          <Form.Select 
            value={selectedLanguage} 
            onChange={onLanguageChange}
            className="filter-select"
          >
            <option value="">Select Language</option>
            {languages.map(language => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;