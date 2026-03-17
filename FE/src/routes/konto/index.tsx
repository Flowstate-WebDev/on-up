import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { Heading } from "@/components/ui/Heading";
import { UserDataBlock, PasswordChangeSection } from "./components/UserDataBlock";
import { OrderHistory } from "./components/OrderHistory";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

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
  const { showToast } = useToast();

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
        showToast("Dane zostały zaktualizowane", "success");
      } else {
        const error = await res.json();
        showToast(error.error || "Błąd podczas aktualizacji danych", "error");
        throw new Error(error.error);
      }
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  };

  const handlePasswordChange = async (oldPassword: string, newPassword: string) => {
    try {
      const res = await fetch("http://localhost:3001/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: "include",
      });
      if (res.ok) {
        showToast("Hasło zostało zmienione", "success");
      } else {
        const error = await res.json();
        throw new Error(error.error || "Błąd podczas zmiany hasła");
      }
    } catch (error: any) {
      console.error("Password change failed:", error);
      throw error;
    }
  };

  const userData = [
    {
      label: "Nazwa użytkownika",
      value: user.username,
      field: "username",
      editable: true,
      onValidate: (val: string) => val.length < 3 ? "Nazwa użytkownika musi mieć min. 3 znaki" : undefined
    },
    { label: "Adres E-mail", value: user.email, field: "email", editable: true },
    {
      label: "Numer Telefonu",
      value: user.phone || "",
      field: "phone",
      editable: true,
      onValidate: (val: string) => {
        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneRegex.test(val)) return "Numer telefonu musi składać się z dokładnie 9 cyfr";
        return undefined;
      }
    },
    {
      label: "Typ konta",
      value: user.role === "ADMIN" ? "Administrator" : "Użytkownik",
      editable: false,
    },
  ];

  const billingData = [
    { label: "Imię", value: user.billingAddress?.firstname || "", field: "firstname", editable: true },
    { label: "Nazwisko", value: user.billingAddress?.lastname || "", field: "lastname", editable: true },
    { label: "Miasto", value: user.billingAddress?.city || "", field: "city", editable: true },
    { label: "Kod pocztowy", value: user.billingAddress?.postalCode || "", field: "postalCode", editable: true },
    { label: "Ulica", value: user.billingAddress?.street || "", field: "street", editable: true },
    { label: "Nr budynku", value: user.billingAddress?.building || "", field: "building", editable: true },
    { label: "Nr lokalu", value: user.billingAddress?.apartment || "", field: "apartment", editable: true },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-secondary pb-6">
        <div>
          <Heading size="xl">Dzień dobry, {user.username}!</Heading>
          <p className="text-text-tertiary">
            Zarządzaj swoim kontem i danymi
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {user.role.toUpperCase() === "ADMIN" && (
            <Button
              style="outline"
              onClick={() => navigate({ to: "/konto/admin" })}
            >
              Panel administracyjny
            </Button>
          )}
          <Button
            style="default"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            Wyloguj się
            <svg
              className="w-4 h-4 ml-1"
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
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-12 xl:col-span-5 bg-bg-secondary rounded-2xl p-6 lg:p-8 border border-border-secondary shadow-sm">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Twoje Dane
          </h2>
          <div className="flex flex-col">
            {userData.map((data) => (
              <UserDataBlock
                key={data.label}
                label={data.label}
                value={data.value}
                editable={data.editable}
                onValidate={(data as any).onValidate}
                onSave={
                  data.field
                    ? (newValue) => handleUpdate(data.field!, newValue)
                    : undefined
                }
              />
            ))}
            <PasswordChangeSection onSave={handlePasswordChange} />

            <h2 className="text-2xl font-semibold text-text-primary mt-12 mb-6 border-t border-border-secondary pt-8">
              Adres rozliczeniowy
            </h2>
            {billingData.map((data) => (
              <UserDataBlock
                key={data.label}
                label={data.label}
                value={data.value}
                editable={data.editable}
                onSave={
                  data.field
                    ? (newValue) => handleUpdate(data.field!, newValue)
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-bg-secondary rounded-2xl p-6 lg:p-8 border border-border-secondary shadow-sm min-h-full">
          <OrderHistory />
        </div>
      </section>
    </div>
  );
}
