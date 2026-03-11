const API_URL = "http://localhost:3001/api/user";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Request failed with status ${res.status}`,
    );
  }
  return res.json();
};

export const userAPI = {
  getOrders: async () => {
    const res = await fetch(`${API_URL}/orders`, { credentials: "include" });
    return handleResponse(res);
  },
};
