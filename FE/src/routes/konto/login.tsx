import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { formOptions, useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/Button";

import { errorInput, inputStyle } from "@/components/ui/Input/Input.variants";
import { useAuth } from "@/context/AuthContext";
import type { Login } from "./login.types";

const loginFormOpts = formOptions({
  defaultValues: {
    username: "",
    password: "",
  } as Login,
});

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
    <main className="flex justify-center items-center py-10">
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-6 justify-center items-center rounded-lg border-2 border-border-primary p-6 w-fit"
      >
        <h1 className="text-3xl font-bold">Zaloguj się</h1>
        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) =>
              value.length < 3
                ? "Nazwa użytkownika powinna mieć ponad 3 znaki"
                : undefined,
          }}
          children={(field) => (
            <>
              <input
                type="text"
                placeholder="Nazwa użytkownika"
                onChange={(e) => field.handleChange(e.target.value)}
                className={`${field.state.meta.errors.length > 0 ? "border-red-500 bg-red-200" : ""} ${inputStyle({ style: "default" })}`}
              />
              {!field.state.meta.isValid && (
                <p className={errorInput()}>
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </>
          )}
        />

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              value.length < 6
                ? "Hasło powinno mieć ponad 6 znaków"
                : undefined,
          }}
          children={(field) => (
            <>
              <input
                type="password"
                placeholder="Hasło"
                onChange={(e) => field.handleChange(e.target.value)}
                className={`${field.state.meta.errors.length > 0 ? "border-red-500 bg-red-200" : ""} ${inputStyle({ style: "default" })}`}
              />
              {!field.state.meta.isValid && (
                <p className={errorInput()}>
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </>
          )}
        />
        <Button style={"default"} type={"submit"} disabled={mutation.isPending}>
          {mutation.isPending ? "Logowanie..." : "Zaloguj"}
        </Button>
        {mutation.isError && (
          <p className={errorInput() + " text-center"}>
            {mutation.error.message}
          </p>
        )}
        <hr className="border-text-tertiary w-full" />
        <p className="text-center">
          Nie masz konta?{" "}
          <Link
            to="/konto/register"
            className="text-primary hover:text-tertiary"
          >
            Zarejestruj się
          </Link>
        </p>
      </form>
    </main>
  );
}
