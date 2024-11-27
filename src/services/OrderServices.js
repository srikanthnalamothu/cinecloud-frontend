import apiClient from "./services";

class OrderService {
  // Get all orders for a user
  static getOrdersByUserId(userId) {
    return apiClient.get(`/orders/users/${userId}`);
  }

  // Get a specific order
  static getOrderById(orderId) {
    return apiClient.get(`/orders/${orderId}`);
  }

  // Create a new order
  static createOrder(orderData) {
    return apiClient.post('/orders', orderData);
  }

  // Delete an order
  static deleteOrder(orderId) {
    return apiClient.delete(`/orders/${orderId}`);
  }

  static checkMovieOrderStatus(userId, movieId) {
    return apiClient.get(`/orders/status/${userId}/${movieId}`);
  }
}

export default OrderService;