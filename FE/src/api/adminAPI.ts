const BASE_URL = "http://localhost:3001/api/admin";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Request failed with status ${res.status}`,
    );
  }
  return res.json();
};

export const fetchAdminOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`, {
    credentials: "include",
  });
  return handleResponse(res);
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await fetch(`${BASE_URL}/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
    credentials: "include",
  });
  return handleResponse(res);
};
