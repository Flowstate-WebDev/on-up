import { createFileRoute } from "@tanstack/react-router";
import { useState, Activity } from "react";
import { Heading } from "@/components/ui/Heading";
import { TabNav } from "./components/AdminPanel/TabNav";
import { ProductManagement } from "./components/AdminPanel/ProductManagement";
import { OrderManagement } from "./components/AdminPanel/OrderManagement";
import { AccountManagement } from "./components/AdminPanel/AccountManagement";

export const Route = createFileRoute("/konto/admin")({
  component: AdminPanel,
});

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<
    "products" | "orders" | "accounts"
  >("products");

  const tabs = [
    { id: "products", label: "Produkty" },
    { id: "orders", label: "Zamówienia" },
    { id: "accounts", label: "Konta" },
  ] as const;

  return (
    <div className="w-full xl:w-2/3 mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Heading size="xl">Panel Administratora</Heading>
          <p className="text-text-tertiary -mt-2">
            Zarządzaj sklepem, zamówieniami i użytkownikami
          </p>
        </div>
      </div>

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="bg-bg-secondary rounded-3xl p-8 border border-border-secondary shadow-sm min-h-125 transition-all duration-300">
        <Activity mode={activeTab === "products" ? "visible" : "hidden"}>
          <ProductManagement />
        </Activity>

        <Activity mode={activeTab === "orders" ? "visible" : "hidden"}>
          <OrderManagement />
        </Activity>

        <Activity mode={activeTab === "accounts" ? "visible" : "hidden"}>
          <AccountManagement />
        </Activity>
      </div>
    </div>
  );
}
