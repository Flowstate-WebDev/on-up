import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { formOptions, useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/Button";

import { inputStyle } from "@/components/ui/Input/Input.variants";
import { useAuth } from "@/context/AuthContext";
import type { Login } from "./login.types";

const loginFormOpts = formOptions({
  defaultValues: {
    username: "",
    password: "",
  } as Login,
});

import { AuthLayout } from "./components/Auth/AuthLayout";

export const Route = createFileRoute("/konto/login")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/konto",
      });
    }
    document.title = "On-Up | Logowanie";
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: async (value: Login) => {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Błąd połączenia z serwerem");
      }

      return data;
    },
    onSuccess: (data) => {
      login(data.user);
      navigate({
        to: "/konto",
      });
    },
  });

  const form = useForm({
    ...loginFormOpts,
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <AuthLayout
      title="Zaloguj się"
      subtitle="Witaj ponownie! Zaloguj się do swojego konta."
    >
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
        className="mt-8 space-y-6"
      >
        <div className="space-y-4">
          <form.Field
            name="username"
            validators={{
              onSubmit: ({ value }) =>
                value.length < 3
                  ? "Nazwa użytkownika powinna mieć ponad 3 znaki"
                  : undefined,
            }}
            children={(field) => (
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Nazwa użytkownika"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full ${field.state.meta.errors.length > 0 ? "border-red-500 bg-red-50" : ""} ${inputStyle({ style: "default" })} transition-all focus:ring-2 focus:ring-primary/20`}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-500 text-xs mt-1 px-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          />

          <form.Field
            name="password"
            validators={{
              onSubmit: ({ value }) =>
                value.length < 6
                  ? "Hasło powinno mieć ponad 6 znaków"
                  : undefined,
            }}
            children={(field) => (
              <div className="space-y-1">
                <input
                  type="password"
                  placeholder="Hasło"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full ${field.state.meta.errors.length > 0 ? "border-red-500 bg-red-50" : ""} ${inputStyle({ style: "default" })} transition-all focus:ring-2 focus:ring-primary/20`}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-500 text-xs mt-1 px-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="space-y-4">
          <Button
            className="w-full py-3 text-base font-bold shadow-lg shadow-primary/20"
            style="default"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logowanie..." : "Zaloguj się"}
          </Button>

          {mutation.isError && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">
              {mutation.error.message}
            </p>
          )}

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-secondary"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-bg-secondary px-2 text-text-tertiary">
                Nie masz konta?
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-text-secondary">
            <Link
              to="/konto/register"
              className="font-bold text-primary hover:text-tertiary transition-colors"
            >
              Utwórz nowe konto
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
