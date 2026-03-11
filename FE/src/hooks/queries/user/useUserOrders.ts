import { useQuery } from "@tanstack/react-query";
import { userAPI } from "@/api/userAPI";

export const useUserOrders = () => {
  return useQuery({
    queryKey: ["user", "orders"],
    queryFn: () => userAPI.getOrders(),
  });
};
