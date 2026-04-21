import { apiClient } from "./apiClient";

export const foodService = {
  getFoods: async () => {
    const response = await apiClient.get("172.16.55.109:8082/food")
    return response.data;
  },

  getFoodById: async (id) => {
    const response = await apiClient.get(`172.16.55.109:8082/food/${id}`)
    return response.data;
  },

  createFood: async (data) => {
    const response = await apiClient.post("172.16.55.109:8082/foods", data)
    return response.data;
  },

  updateFood: async (id, data) => {
    const response = await apiClient.put(`172.16.55.109:8082/foods/${id}`, data)
    return response.data;
  },

  deleteFood: async (id) => {
    const response = await apiClient.delete(`172.16.55.109:8082/foods/${id}`)
    return response.data;
  },
};