import { fetchAdminOrders, updateOrderStatus } from "@/api/adminAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["admin", "orders"],
    queryFn: fetchAdminOrders,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });
};
