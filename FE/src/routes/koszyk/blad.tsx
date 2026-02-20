import { createFileRoute, Link } from "@tanstack/react-router";
import { Heading } from "@/components/ui/Heading";
import { useEffect } from "react";

export const Route = createFileRoute("/koszyk/blad")({
  component: ErrorPage,
});

function ErrorPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const errorMsg = searchParams.get("error");

  useEffect(() => {
    document.title = "On-Up | Błąd zamówienia";
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl text-center">
      <div className="animate-fadeIn space-y-12">
        {/* Error Icon with layered animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-32 h-32 bg-bg-secondary border-4 border-red-500/30 rounded-full flex items-center justify-center shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
              <svg
                className="w-16 h-16 text-red-500 animate-[shake_0.5s_infinite_alternate]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* Warning bits */}
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-600 rounded-lg rotate-12 animate-bounce" />
            <div className="absolute -bottom-6 left-0 w-4 h-4 bg-orange-500 rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>

        <div className="space-y-4">
          <Heading size="xl">Coś poszło nie tak...</Heading>
          <div className="space-y-2">
            <p className="text-text-secondary text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Niestety, nie udało się przetworzyć Twojego zamówienia. Może to
              być spowodowane problemem z płatnością lub błędem technicznym.
            </p>
            {errorMsg && (
              <p className="text-red-500/80 text-sm font-mono mt-4 bg-red-500/5 py-2 px-4 rounded-lg inline-block">
                Kod błędu: {errorMsg}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 min-w-30">
          <Link
            to="/koszyk/podsumowanie"
            className="w-full sm:w-auto group relative bg-primary text-text-obj font-black px-12 py-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(var(--color-primary),0.5)] hover:shadow-primary/40 hover:-translate-y-1 transition-all text-center uppercase tracking-tighter overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Spróbuj ponownie
              <svg
                className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform rotate-180"
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
            to="/"
            className="w-full sm:w-auto bg-bg-secondary text-text-primary border-2 border-gray-600/10 font-black px-12 py-5 rounded-2xl hover:bg-gray-600/5 hover:border-primary transition-all text-center uppercase tracking-tighter"
          >
            Wróć do sklepu
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(2px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
