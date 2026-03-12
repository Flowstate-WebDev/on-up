import { useState, type ReactNode } from "react";

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
    <div className="group relative bg-bg-primary/50 hover:bg-bg-primary border border-border-secondary/60 p-4 rounded-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
          {label}
        </span>
        {editable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[10px] font-bold uppercase tracking-widest text-primary-500 hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            Zmień
          </button>
        )}
      </div>

      <div className="flex justify-between items-center gap-4">
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              type={type}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="flex-1 bg-bg-secondary border border-border-secondary rounded-lg px-3 py-1 text-sm text-text-primary focus:outline-none focus:border-primary-500"
              autoFocus
              disabled={isLoading}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="text-[10px] font-bold uppercase tracking-widest text-green-500 hover:text-green-600 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "..." : "Zapisz"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 disabled:opacity-50 cursor-pointer"
              >
                Anuluj
              </button>
            </div>
          </div>
        ) : (
          <p className="text-text-primary font-semibold text-[15px]">
            {type === "password" ? "••••••••" : value}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};