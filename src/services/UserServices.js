import apiClient from "./services";

class AuthService {
  // Get user profile
  static getUser() {
    return apiClient.get('users');
  }

  // Register new user
  static addUser(user) {
    return apiClient.post('users', user);
  }

  // Login user with Basic Auth
  static loginUser(user) {
    const credentials = btoa(`${user.email}:${user.password}`);
    
    return apiClient.post('login', user, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'crossDomain': true,
        'Authorization': `Basic ${credentials}`
      }
    });
  }

  // Logout user
  static logoutUser() {
    const user = localStorage.getItem('user');
    if (!user) return Promise.reject('No user logged in');

    const userData = JSON.parse(user);
    const token = userData.token; // Assuming the token is stored in the user object

    return apiClient.get("logout", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Helper method to check if user is logged in
  static isAuthenticated() {
    const user = localStorage.getItem('user');
    return !!user;
  }

  // Helper method to get current user data
  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default AuthService;
