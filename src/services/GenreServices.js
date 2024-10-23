import apiClient from "./services";

class GenreService {
  
  // Get all genres
  static getGenres() {
    return apiClient.get('genres');
  }

  // Get single genre by ID
  static getGenre(id) {
    return apiClient.get(`genres/${id}`);
  }

  // Add new genre
  static addGenre(genre) {
    return apiClient.post('genres', genre);
  }

  // Update existing genre
  static updateGenre(genre) {
    return apiClient.put(`genres/${genre.id}`, genre);
  }

  // Delete genre
  static deleteGenre(genreId) {
    return apiClient.delete(`genres/${genreId}`);
  }
}

export default GenreService;