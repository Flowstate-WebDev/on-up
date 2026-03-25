import { apiClient } from "./apiClient";

export const fetchAdminOrders = async () => {
  return apiClient("/admin/orders", {
    credentials: "include",
  });
};

export const updateOrderStatus = async (id: string, status: string) => {
  return apiClient(`/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    credentials: "include",
  });
};
