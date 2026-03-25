import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface PasswordChangeSectionProps {
  onSave: (oldPassword: string, newPassword: string) => Promise<void>;
}

export const PasswordChangeSection = ({ onSave }: PasswordChangeSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setError(null);

    if (!oldPassword || !newPassword || !repeatPassword) {
      setError("Wszystkie pola są wymagane");
      return;
    }

    if (newPassword !== repeatPassword) {
      setError("Hasła się nie zgadzają");
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError("Nowe hasło musi mieć co najmniej 8 znaków, 1 cyfrę i znak specjalny");
      return;
    }

    setIsLoading(true);
    try {
      await onSave(oldPassword, newPassword);
      setIsEditing(false);
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (err: any) {
      setError(err.message || "Błąd podczas zmiany hasła");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setOldPassword("");
    setNewPassword("");
    setRepeatPassword("");
    setError(null);
  };

  return (
    <div className="py-5 border-b border-border-secondary last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <span className="block text-sm font-medium text-text-tertiary mb-1">
            Hasło
          </span>
          {!isEditing && (
            <p className="text-text-primary text-base font-semibold">
              ••••••••
            </p>
          )}
        </div>
        {!isEditing && (
          <Button
            style="outline"
            onClick={() => setIsEditing(true)}
            className="py-1 px-3 text-sm"
          >
            Zmień hasło
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="mt-4 space-y-4 max-w-md">
          <div className="space-y-2">
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Stare hasło"
              autoComplete="current-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={isLoading}
            />
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Nowe hasło"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
            />
            <Input
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              placeholder="Powtórz nowe hasło"
              autoComplete="new-password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center gap-2">
            <Button style="default" onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Zmienianie..." : "Zmień hasło"}
            </Button>
            <Button style="outline" onClick={handleCancel} disabled={isLoading}>
              Anuluj
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
