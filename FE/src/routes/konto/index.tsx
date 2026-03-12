import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { Heading } from "@/components/ui/Heading";
import { UserDataBlock } from "./components/UserDataBlock";
import { OrderHistory } from "./components/OrderHistory";

export const Route = createFileRoute("/konto/")({
  beforeLoad: ({ context }) => {
    document.title = "On-Up | Moje konto";
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/konto/login",
      });
    }
  },
  component: AccountPage,
});

function AccountPage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate({
      to: "/konto/login",
    });
  };

  const handleUpdate = async (field: string, value: string) => {
    try {
      const res = await fetch("http://localhost:3001/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        updateUser(data.user);
      } else {
        const error = await res.json();
        alert(error.error || "Błąd podczas aktualizacji danych");
        throw new Error(error.error);
      }
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  };

  const userData = [
    {
      label: "Nazwa użytkownika",
      value: user.username,
      field: "username",
      editable: true,
    },
    { label: "Adres E-mail", value: user.email, field: "email", editable: true },
    {
      label: "Numer Telefonu",
      value: user.phone || "",
      field: "phone",
      editable: true,
    },
    {
      label: "Hasło",
      value: "********",
      field: "password",
      editable: true,
      type: "password" as const,
    },
    {
      label: "Typ konta",
      value: user.role === "admin" ? "Administrator" : "Użytkownik",
      editable: false,
    },
  ];

  return (
    <div className="w-full xl:w-5/6 mx-auto p-6 space-y-8">
      <div>
        <Heading size="xl">Dzień dobry, {user.username}!</Heading>
        <p className="text-text-tertiary -mt-2">
          Zarządzaj swoim kontem i danymi
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-bg-secondary rounded-3xl p-8 border border-border-secondary shadow-sm flex flex-col min-h-full">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">
              Twoje Dane
            </h2>
            <div className="space-y-4">
              {userData.map((data) => (
                <UserDataBlock
                  key={data.label}
                  label={data.label}
                  value={data.value}
                  editable={data.editable}
                  type={data.type}
                  onSave={
                    data.field
                      ? (newValue) => handleUpdate(data.field!, newValue)
                      : undefined
                  }
                >
                  {data.label === "Typ konta" && user.role === "admin" && (
                    <button
                      onClick={() => navigate({ to: "/konto/admin" })}
                      className="inline-flex items-center gap-2 bg-primary-500/5 hover:bg-primary-500/10 text-primary-500 font-bold uppercase tracking-widest text-[10px] px-3 py-2 rounded-xl border border-primary-500/10 hover:border-primary-500/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-primary-500/5"
                    >
                      Panel administracyjny
                    </button>
                  )}
                </UserDataBlock>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-12 pb-2">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 bg-red-500/5 hover:bg-red-500/10 text-red-500 font-bold uppercase tracking-widest text-[10px] px-4 py-2.5 rounded-xl border border-red-500/10 hover:border-red-500/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-red-500/5"
            >
              Wyloguj się
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-3xl p-8 border border-border-secondary shadow-sm min-h-full">
          <OrderHistory />
        </div>
      </section>
    </div>
  );
}
