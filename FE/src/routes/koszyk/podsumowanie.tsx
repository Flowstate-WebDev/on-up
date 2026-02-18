import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "@/components/ui/Heading";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Input } from "@/components/ui/Input";

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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd podczas tworzenia płatności");
      }

      // Czyścimy koszyk przed przekierowaniem
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
          {/* Dane kontaktowe */}
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

          {/* Adres rozliczeniowy */}
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

          {/* Metoda płatności */}
          <section className="bg-bg-secondary p-6 rounded-lg shadow-md">
            <Heading size="md">Metoda płatności</Heading>
            <div className="flex items-center justify-between p-4 border-2 border-primary bg-primary/5 rounded-lg mt-4">
              <div className="flex items-center gap-4">
                <div className="bg-white px-2 py-1 rounded shadow-sm">
                  <span className="text-lg font-black italic tracking-tighter text-[#7134FE]">
                    Pay<span className="text-[#212121]">now</span>
                  </span>
                </div>
                <span className="font-semibold text-text-primary">
                  Szybki przelew / BLIK
                </span>
              </div>
              <div className="w-5 h-5 rounded-full border-4 border-primary bg-primary" />
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:w-1/3 shrink-0">
          <div className="bg-bg-secondary p-6 rounded-lg shadow-md sticky top-24">
            <Heading size="md">Twoje zamówienie</Heading>

            <div className="flex flex-col gap-3 my-6">
              {groupedItems.map((item) => (
                <div
                  key={item.id}
                  className="text-sm border-b border-gray-600/20 pb-2 last:border-0 text-text-secondary"
                >
                  <p className="font-medium truncate mb-1" title={item.title}>
                    {item.title}
                  </p>
                  <div className="flex justify-between">
                    <span>
                      {Number(item.price).toFixed(2)} PLN x {item.quantity}
                    </span>
                    <span className="font-semibold text-text-primary">
                      {(Number(item.price) * item.quantity).toFixed(2)} PLN
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6 text-lg border-t-2 border-primary pt-4">
              <Heading size="sm">Do zapłaty:</Heading>
              <span className="font-bold text-primary text-xl">
                {totalPrice.toFixed(2)} PLN
              </span>
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
