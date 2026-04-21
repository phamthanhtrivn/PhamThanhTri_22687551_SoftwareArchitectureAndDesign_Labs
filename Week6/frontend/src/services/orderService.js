import { apiClient } from "./apiClient";

export const orderService = {
  createOrder: async (data) => {
    const response = await apiClient.post("172.16.55.109:8083/orders", data);
    return response.data;
  },

  getOrders: async () => {
    const response = await apiClient.get("172.16.55.109:8083/orders");
    return response.data;
  },
};
