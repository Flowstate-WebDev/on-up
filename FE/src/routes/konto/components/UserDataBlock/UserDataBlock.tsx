import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface UserDataBlockProps {
  label: string;
  value: string;
  children?: ReactNode;
  editable?: boolean;
  type?: "text" | "password";
  onSave?: (newValue: string) => Promise<void>;
  onValidate?: (value: string) => string | undefined;
  name?: string;
  autoComplete?: string;
}

export const UserDataBlock = ({
  label,
  value,
  children,
  editable = false,
  type = "text",
  onSave,
  onValidate,
  name,
  autoComplete,
}: UserDataBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSave = async () => {
    if (!onSave) return;

    if (onValidate) {
      const validationError = onValidate(tempValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setError(undefined);
    setIsLoading(true);
    try {
      await onSave(tempValue);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Błąd zapisu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value);
    setError(undefined);
    setIsEditing(false);
  };

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-border-secondary last:border-0 gap-4">
      <div className="flex-1">
        <span className="block text-sm font-medium text-text-tertiary mb-1">
          {label}
        </span>
        
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <div className="flex flex-col gap-1 w-full sm:max-w-xs">
              <Input
                id={name}
                name={name}
                type={type}
                value={tempValue}
                autoComplete={autoComplete}
                onChange={(e) => {
                  setTempValue(e.target.value);
                  if (error) setError(undefined);
                }}
                className={`w-full ${error ? "border-red-500 bg-red-50" : ""}`}
                autoFocus
                disabled={isLoading}
              />
              {error && (
                <p className="text-red-500 text-xs px-1 font-medium">{error}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                style="default"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "..." : "Zapisz"}
              </Button>
              <Button
                style="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Anuluj
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-text-primary text-base font-semibold">
              {type === "password" ? "••••••••" : value}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3">
         {editable && !isEditing && (
            <Button
              style="outline"
              onClick={() => setIsEditing(true)}
              className="py-1 px-3 text-sm"
            >
              Zmień
            </Button>
          )}
          {children}
      </div>
    </div>
  );
};
