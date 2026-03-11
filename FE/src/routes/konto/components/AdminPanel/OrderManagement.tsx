import { useAdminOrders } from "@/hooks/queries/admin/useAdminOrders";
import { OrderRow } from "./OrderRow";

export function OrderManagement() {
  const { data: orders, isLoading, error } = useAdminOrders();

  if (isLoading)
    return (
      <p className="text-center py-10 text-text-tertiary animate-pulse">
        Ładowanie zamówień...
      </p>
    );
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Błąd podczas ładowania zamówień: {error.message}
      </p>
    );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">
          Zarządzanie Zamówieniami
        </h2>
        <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase">
          <span>Łącznie: {orders?.length || 0}</span>
        </div>
      </div>

      <div className="space-y-4">
        {orders?.length === 0 ? (
          <div className="bg-bg-primary rounded-2xl p-8 text-center border border-border-secondary border-dashed">
            <p className="text-text-tertiary text-sm">
              Brak zamówień w systemie.
            </p>
          </div>
        ) : (
          orders?.map((order: any) => <OrderRow key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}
