import { apiClient } from "./apiClient";

export const userAPI = {
  getOrders: async () => {
    return apiClient("/user/orders", { credentials: "include" });
  },
};
