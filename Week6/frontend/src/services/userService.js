import { apiClient } from "./apiClient";

export const userService = {
  login: async (data) => {
    const response = await apiClient.post("172.16.55.191:8081/login", data);
    return response.data;
  },
  register: async (data) => {
    // Thêm trường roles mặc định là ["USER"] nếu API yêu cầu, nhưng tạm gửi nguyên data
    const response = await apiClient.post("172.16.55.191:8081/register", data);
    return response.data;
  },
};
