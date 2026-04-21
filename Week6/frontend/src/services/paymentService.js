import { apiClient } from "./apiClient";

const PAYMENT_SERVICE_URL = "172.16.55.109:8084";

export const paymentService = {
  pay: async (data) => {
    const response = await apiClient.post(`${PAYMENT_SERVICE_URL}/payments`, data);
    return response.data;
  },
};
