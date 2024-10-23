import apiClient from "./services";

class LanguageService {
  // Get all languages
  static getLanguages() {
    return apiClient.get('languages');
  }

  // Get single language by ID
  static getLanguage(id) {
    return apiClient.get(`languages/${id}`);
  }

  // Add new language
  static addLanguage(language) {
    return apiClient.post('languages', language);
  }

  // Update existing language
  static updateLanguage(language) {
    return apiClient.put(`languages/${language.id}`, language);
  }

  // Delete language
  static deleteLanguage(languageId) {
    return apiClient.delete(`languages/${languageId}`);
  }
}

export default LanguageService;