import { createFileRoute, Link } from "@tanstack/react-router";
import { Heading } from "@/components/ui/Heading";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/koszyk/sukces")({
  component: SuccessPage,
});

function SuccessPage() {
  const { products } = useCart();

  useEffect(() => {
    document.title = "On-Up | Dziękujemy za zamówienie";
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl text-center">
      <div className="animate-fadeIn space-y-12">
        {/* Success Icon with layered animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-32 h-32 bg-bg-secondary border-4 border-green-500/30 rounded-full flex items-center justify-center shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />
              <svg
                className="w-16 h-16 text-green-500 animate-[bounce_2s_infinite]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Confetti-like bits */}
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-lg rotate-12 animate-bounce" />
            <div className="absolute -bottom-6 left-0 w-4 h-4 bg-secondary rounded-full animate-bounce [animation-delay:0.3s]" />
            <div className="absolute top-1/2 -left-8 w-5 h-1 bg-green-500/40 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <Heading size="xl">Zamówienie przyjęte!</Heading>
          <p className="text-text-secondary text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Dziękujemy za zakupy w{" "}
            <span className="text-primary font-black">On-Up</span>. Twoja
            płatność została pomyślnie przetworzona, a system właśnie
            przygotowuje Twoje książki.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-10">
          <Link
            to="/"
            className="w-full sm:w-auto group relative bg-primary text-text-obj font-black px-12 py-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(var(--color-primary),0.5)] hover:shadow-primary/40 hover:-translate-y-1 transition-all text-center uppercase tracking-tighter overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Kontynuuj zakupy
              <svg
                className="w-4 h-4 group-hover:translate-x-1.5 transition-transform"
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
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>

          <Link
            to="/konto"
            className="w-full sm:w-auto bg-bg-secondary text-text-primary border-2 border-gray-600/10 font-black px-12 py-5 rounded-2xl hover:bg-gray-600/5 hover:border-primary transition-all text-center uppercase tracking-tighter"
          >
            Panel Klienta
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
