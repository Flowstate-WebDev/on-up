import { useUserOrders } from "@/hooks/queries/user/useUserOrders";
import { UserOrderRow } from "./UserOrderRow";
import { Heading } from "@/components/ui/Heading";

export function OrderHistory() {
  const { data: orders, isLoading, error } = useUserOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center">
        Błąd podczas ładowania historii zamówień
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-bg-secondary/50 border-2 border-dashed border-border-secondary rounded-2xl p-12 text-center">
        <p className="text-text-tertiary">
          Nie złożono jeszcze żadnych zamówień.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Heading size="md">Historia zamówień</Heading>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <UserOrderRow key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
