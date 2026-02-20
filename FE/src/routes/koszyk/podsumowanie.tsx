import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "@/components/ui/Heading";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { PriceSummary } from "./components/PriceSummary";

export const Route = createFileRoute("/koszyk/podsumowanie")({
  component: PodsumowaniePage,
});

function PodsumowaniePage() {
  const { groupedItems, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    city: "",
    postalCode: "",
    street: "",
    building: "",
    apartment: "",
  });

  const [shippingMethod, setShippingMethod] = useState("inpost");
  const [shippingPoint, setShippingPoint] = useState("");

  const shippingPrices: Record<string, number> = {
    inpost: 14,
    orlen: 11,
    kurier: 18,
    poczta: 15,
  };

  const currentShippingCost =
    shippingPrices[shippingMethod as keyof typeof shippingPrices] || 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:3001/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            city: formData.city,
            postalCode: formData.postalCode,
            street: formData.street,
            building: formData.building,
            apartment: formData.apartment,
          },
          items: groupedItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          shippingMethod,
          shippingPoint,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd podczas tworzenia płatności");
      }

      clearCart();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Błąd: Nie otrzymano linku do płatności");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Heading size="xl">Finalizacja zamówienia</Heading>

      <form
        onSubmit={handlePayNow}
        className="mt-8 flex flex-col lg:flex-row gap-8"
      >
        <div className="flex-1 flex flex-col gap-6">
          <section className="bg-bg-secondary p-6 rounded-lg shadow-md">
            <Heading size="md">Dane do zamówienia</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-secondary">
                  Adres E-mail
                </label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  style="default"
                  placeholder="twoj@email.pl"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-secondary">
                  Numer telefonu
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  style="default"
                  placeholder="+48 000 000 000"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-secondary">
                  Imię
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  style="default"
                  placeholder="Jan"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-secondary">
                  Nazwisko
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  style="default"
                  placeholder="Kowalski"
                  required
                />
              </div>
            </div>
          </section>

          <section className="bg-bg-secondary p-6 rounded-lg shadow-md">
            <Heading size="md">Adres rozliczeniowy</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-secondary">
                  Ulica
                </label>
                <Input
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  type="text"
                  style="default"
                  placeholder="ul. Sezamkowa"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-secondary">
                    Nr domu
                  </label>
                  <Input
                    name="building"
                    value={formData.building}
                    onChange={handleChange}
                    type="text"
                    style="default"
                    placeholder="12"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-secondary">
                    Nr lokalu
                  </label>
                  <Input
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    type="text"
                    style="default"
                    placeholder="4"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-secondary">
                  Kod pocztowy
                </label>
                <Input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  type="text"
                  style="default"
                  placeholder="00-000"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-secondary">
                  Miasto
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  style="default"
                  placeholder="Warszawa"
                  required
                />
              </div>
            </div>
          </section>

          <section className="bg-bg-secondary p-6 rounded-lg shadow-md">
            <Heading size="md">Opcje wysyłki</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                { id: "inpost", name: "Inpost Paczkomaty 24/7", cost: 14 },
                { id: "orlen", name: "Orlen paczka", cost: 11 },
                { id: "kurier", name: "Kurier", cost: 18 },
                { id: "poczta", name: "Poczta Polska", cost: 15 },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    shippingMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-600/20 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="font-semibold text-text-primary">
                        {method.name}
                      </span>
                    </div>
                  </div>
                  {shippingMethod === method.id &&
                    (method.id === "inpost" || method.id === "orlen") && (
                      <div className="mt-3">
                        <Input
                          placeholder={
                            method.id === "inpost"
                              ? "Kod paczkomatu (np. WAW01N)"
                              : "Nr punktu PSD (np. 106088)"
                          }
                          value={shippingPoint}
                          onChange={(e) => setShippingPoint(e.target.value)}
                          required
                          style="default"
                        />
                        <p className="text-[10px] text-text-secondary mt-1 italic">
                          Wpisz kod punktu odbioru. Docelowo tutaj będzie mapa.
                        </p>
                      </div>
                    )}
                </label>
              ))}
            </div>
          </section>

          <section className="bg-bg-secondary p-6 rounded-lg shadow-md">
            <Heading size="md">Metoda płatności</Heading>
            <div className="flex items-center justify-between p-4 border-2 border-primary bg-primary/5 rounded-lg mt-4">
              <div className="flex items-center gap-4">
                <div className="bg-white px-2 py-1 rounded shadow-sm">
                  <img src="/images/paynowLogo.png" className="h-8" />
                </div>
                <span className="font-semibold text-text-primary">
                  Szybki przelew / BLIK
                </span>
              </div>
              <div className="w-5 h-5 rounded-full border-4 border-primary bg-primary" />
            </div>
          </section>
        </div>

        <div className="lg:w-1/3 shrink-0">
          <div className="bg-bg-secondary p-6 rounded-lg shadow-md sticky top-24">
            <Heading size="md">Twoje zamówienie</Heading>
            <div className="my-6">
              <PriceSummary
                groupedItems={groupedItems}
                totalPrice={totalPrice}
                shippingCost={currentShippingCost}
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full text-text-obj font-bold py-3 rounded-lg transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-secondary"
              }`}
            >
              {isProcessing ? "Przetwarzanie..." : "ZAPŁAĆ Z PAYNOW"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
