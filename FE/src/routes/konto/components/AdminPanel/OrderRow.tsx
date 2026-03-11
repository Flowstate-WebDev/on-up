import { useState } from "react";
import { useUpdateOrderStatus } from "@/hooks/queries/admin/useAdminOrders";
import { useToast } from "@/context/ToastContext";

interface OrderRowProps {
  order: any;
}

export function OrderRow({ order }: OrderRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { showToast } = useToast();
  const updateStatusMutation = useUpdateOrderStatus();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: order.id,
        status: newStatus,
      });
      showToast("Status zamówienia zaktualizowany", "success");
    } catch (err: any) {
      showToast("Błąd: " + err.message, "error");
    }
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
    CONFIRMED: "bg-green-100 text-green-700 border-green-200",
    REJECTED: "bg-red-100 text-red-700 border-red-200",
    ERROR: "bg-red-100 text-red-700 border-red-200",
    EXPIRED: "bg-gray-100 text-gray-700 border-gray-200",
    ABANDONED: "bg-orange-100 text-orange-700 border-orange-200",
    NEW: "bg-blue-100 text-blue-700 border-blue-200",
    SENT: "bg-purple-100 text-purple-700 border-purple-200",
    CANCELLED: "bg-gray-100 text-gray-400 border-gray-200",
  };

  const statusTranslations: Record<string, string> = {
    PENDING: "Oczekuje",
    CONFIRMED: "Opłacone",
    REJECTED: "Odrzucone",
    ERROR: "Błąd",
    EXPIRED: "Wygasło",
    ABANDONED: "Porzucone",
    NEW: "Nowe",
    SENT: "Wysłane",
    CANCELLED: "Anulowane",
  };

  return (
    <div
      className={`bg-bg-primary rounded-2xl border border-border-secondary transition-all ${isExpanded ? "ring-1 ring-primary/20 shadow-md" : "hover:border-primary/50"}`}
    >
      <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Basic Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-text-primary">
              {order.orderNumber}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusColors[order.status] || "bg-gray-100"}`}
            >
              {statusTranslations[order.status] || order.status}
            </span>
          </div>
          <p className="text-xs text-text-tertiary mt-1">
            {new Date(order.createdAt).toLocaleString("pl-PL")} •{" "}
            {order.customerEmail}
          </p>
        </div>

        {/* Amount & User Link */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-lg font-bold text-primary">
              {order.totalAmount} zł
            </p>
            {order.user ? (
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">
                Konto: {order.user.username}
              </span>
            ) : (
              <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase">
                Gość
              </span>
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-bg-secondary rounded-xl transition-colors cursor-pointer"
          >
            <span
              className={`block transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border-secondary p-6 bg-bg-secondary/30 space-y-6 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Items */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-2">
                📦 Produkty
              </h4>
              <div className="space-y-2">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-bg-primary p-3 rounded-xl border border-border-secondary"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {item.book.title}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {item.quantity} szt. × {item.price} zł
                      </p>
                    </div>
                    <p className="font-bold text-text-primary">
                      {(item.quantity * Number(item.price)).toFixed(2)} zł
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Actions */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-2">
                  📍 Adres Dostawy
                </h4>
                <div className="bg-bg-primary p-4 rounded-xl border border-border-secondary text-sm space-y-1">
                  <p className="font-bold text-text-primary">
                    {order.customerFirstName} {order.customerLastName}
                  </p>
                  <p className="text-text-secondary">
                    {order.customerStreet} {order.customerBuilding}
                    {order.customerApartment
                      ? `/${order.customerApartment}`
                      : ""}
                  </p>
                  <p className="text-text-secondary">
                    {order.customerPostalCode} {order.customerCity}
                  </p>
                  <p className="text-text-secondary mt-2">
                    📞 {order.customerPhone}
                  </p>
                  <div className="mt-3 pt-3 border-t border-border-secondary flex gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-text-tertiary uppercase">
                      Metoda: {order.shippingMethod}
                    </span>
                    {order.shippingPoint && (
                      <span className="text-[10px] font-bold text-text-tertiary uppercase">
                        Punkt: {order.shippingPoint}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Change */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-2">
                  ⚡ Akcje
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "PENDING",
                    "CONFIRMED",
                    "SENT",
                    "REJECTED",
                    "ABANDONED",
                    "CANCELLED",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={updateStatusMutation.isPending}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all border cursor-pointer
                        ${
                          order.status === status
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-bg-primary text-text-secondary border-border-secondary hover:border-primary/50"
                        }
                      `}
                    >
                      {statusTranslations[status] || status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
