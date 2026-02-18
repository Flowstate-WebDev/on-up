import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "@/components/ui/Heading";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Input } from "@/components/ui/Input";

export const Route = createFileRoute("/koszyk/podsumowanie")({
  component: PodsumowaniePage,
});

function PodsumowaniePage() {
  const { groupedItems, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
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
          amount: totalPrice,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          externalId: `ORDER-${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd podczas tworzenia płatności");
      }

      // Przekierowanie do bramki PayNow
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
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <Heading size="xl">Finalizacja zamówienia</Heading>
          <p className="text-text-tertiary -mt-4">
            Wypełnij dane, aby dokończyć zakup
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 text-sm font-bold">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-xs">
              1
            </span>
            <span className="hidden sm:inline">Koszyk</span>
          </div>
          <div className="w-8 h-0.5 bg-primary/20" />
          <div className="flex items-center gap-2 text-primary">
            <span className="w-8 h-8 rounded-full bg-primary text-text-obj flex items-center justify-center text-xs shadow-lg shadow-primary/30">
              2
            </span>
            <span>Podsumowanie</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-600/20" />
          <div className="flex items-center gap-2 text-text-tertiary opacity-50">
            <span className="w-8 h-8 rounded-full border-2 border-gray-600/20 flex items-center justify-center text-xs">
              3
            </span>
            <span className="hidden sm:inline">Płatność</span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePayNow} className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* Dane kontaktowe */}
          <section className="bg-bg-secondary p-8 rounded-4xl shadow-sm border border-gray-600/5 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-primary rounded-full" />
              <Heading size="md">Dane do zamówienia</Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">
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
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">
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
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">
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
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">
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

          {/* Metoda płatności */}
          <section className="bg-bg-secondary p-8 rounded-4xl shadow-sm border border-gray-600/5 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-primary rounded-full" />
              <Heading size="md">Metoda płatności</Heading>
            </div>

            <div className="group relative border-2 border-primary bg-primary/5 p-6 rounded-2xl flex items-center justify-between transition-all hover:bg-primary/10 cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="text-xl font-black italic tracking-tighter text-[#7134FE]">
                    Pay<span className="text-[#212121]">now</span>
                  </span>
                </div>
                <div>
                  <p className="font-black text-text-primary uppercase text-sm tracking-tight">
                    Szybki przelew / BLIK
                  </p>
                  <p className="text-xs text-text-tertiary">
                    Bezpieczna płatność obsługiwana przez mBank
                  </p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/20">
                <div className="w-2.5 h-2.5 bg-text-obj rounded-full" />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4">
          <div className="bg-bg-secondary p-8 rounded-4xl shadow-2xl border border-primary/10 sticky top-24 overflow-hidden group">
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary via-secondary to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite]" />

            <div className="mb-8">
              <Heading size="md">Twoje produkty</Heading>
            </div>

            <div className="space-y-5 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
              {groupedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start gap-4 group/item"
                >
                  <div className="flex-1">
                    <p className="font-bold text-sm line-clamp-2 text-text-primary group-hover/item:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-tighter text-text-tertiary mt-1">
                      {item.quantity} szt. × {Number(item.price).toFixed(2)} PLN
                    </p>
                  </div>
                  <span className="font-black text-sm whitespace-nowrap text-text-primary">
                    {(Number(item.price) * item.quantity).toFixed(2)} PLN
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-600/10">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-text-tertiary">
                <span>Wartość koszyka:</span>
                <span className="text-text-secondary">
                  {totalPrice.toFixed(2)} PLN
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-text-tertiary">
                <span>Dostawa (E-mail):</span>
                <span className="text-green-500 font-black">BEZPŁATNIE</span>
              </div>

              <div className="flex justify-between items-center pt-6 mt-2 border-t-2 border-primary/20">
                <span className="font-black text-xl uppercase tracking-tighter">
                  Do zapłaty:
                </span>
                <div className="text-right">
                  <span className="block text-3xl font-black text-primary drop-shadow-sm leading-none">
                    {totalPrice.toFixed(2)} PLN
                  </span>
                  <span className="text-[10px] text-text-tertiary font-bold">
                    zawiera podatek VAT
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full group relative overflow-hidden bg-primary text-text-obj font-black py-5 rounded-2xl transition-all shadow-lg hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 cursor-pointer disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="animate-spin h-6 w-6 text-current"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Przetwarzanie...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    ZAPŁAĆ Z PAYNOW
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[9px] text-text-tertiary uppercase tracking-[0.2em] font-black">
              <svg
                className="w-3.5 h-3.5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </form>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
