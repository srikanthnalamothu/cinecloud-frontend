import apiClient from "./services";

class OrderService {
  // Get orders for a specific user
  static getOrders(userId) {
    return apiClient.get(`orders/users/${userId}`);
  }

  // Add new order
  static addOrder(order) {
    return apiClient.post('orders', order);
  }

  // Delete order
  static deleteOrder(id) {
    return apiClient.delete(`orders/${id}`);
  }

  // Get specific order by ID
  static getOrderById(id) {
    return apiClient.get(`orders/${id}`);
  }
}

export default OrderService;