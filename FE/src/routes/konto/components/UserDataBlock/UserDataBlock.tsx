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
}

export const UserDataBlock = ({
  label,
  value,
  children,
  editable = false,
  type = "text",
  onSave,
}: UserDataBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    setIsLoading(true);
    try {
      await onSave(tempValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value);
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
            <Input
              type={type}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full sm:max-w-xs"
              autoFocus
              disabled={isLoading}
            />
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
