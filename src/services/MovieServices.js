import apiClient from "./services";

class MovieService {
  // Basic CRUD operations
  static getMovies() {
    return apiClient.get('movies');
  }

  static getMovie(id) {
    return apiClient.get(`movies/${id}`);
  }

  static addMovie(movie) {
    return apiClient.post('movies', movie);
  }

  static updateMovie(movie) {
    return apiClient.put(`movies/${movie.id}`, movie);
  }

  static deleteMovie(movieId) {
    return apiClient.delete(`movies/${movieId}`);
  }

  // Filter operations
  static getMoviesByGenre(genreId) {
    return apiClient.get(`movies?genre_id=${genreId}`);
  }

  static getMoviesByLanguage(languageId) {
    return apiClient.get(`movies?language_id=${languageId}`);
  }

  static getMoviesByFilters({ genreId, languageId, search }) {
    const params = new URLSearchParams();
    
    if (genreId) params.append('genre_id', genreId);
    if (languageId) params.append('language_id', languageId);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    return apiClient.get(`movies${queryString ? `?${queryString}` : ''}`);
  }

  // Search operation
  static searchMovie(key) {
    return apiClient.get(`movies?search=${key}`);
  }

  // Recommendations
  static getRecommendations() {
    const userStr = localStorage.getItem('user');
    const userId = userStr ? JSON.parse(userStr).id : null;

    if (userId) {
      return apiClient.get(`movies/recommendations?user_id=${userId}`);
    }
    return apiClient.get('movies/recommendations');
  }
}

export default MovieService;