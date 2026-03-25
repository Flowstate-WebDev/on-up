import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { AdminLabel } from "@/components/ui/AdminLabel/AdminLabel";
import { getImageSrc } from "@/utils/productUtils";
import { uploadBookImage } from "@/api/booksAPI";

interface ProductRowEditProps {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
  onToggleProfession: (id: string) => void;
  onToggleQualification: (id: string) => void;
  isPending: boolean;
  professions: any[];
  qualifications: any[];
}

export function ProductRowEdit({
  formData,
  onChange,
  onSave,
  onCancel,
  onToggleProfession,
  onToggleQualification,
  isPending,
  professions,
  qualifications,
}: ProductRowEditProps) {
  const [imgError, setImgError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset image error state when imageUrl changes
  useEffect(() => {
    setImgError(false);
  }, [formData.imageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const { url } = await uploadBookImage(file);
      // Simulate onChange so parent's formData.imageUrl is updated
      const syntheticEvent = {
        target: { name: "imageUrl", value: url },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    } catch (err: any) {
      setUploadError(err.message || "Błąd podczas przesyłania obrazu");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Product Image Upload */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Kliknij aby przesłać obraz"
          className="w-full md:w-24 h-24 bg-bg-secondary rounded-xl overflow-hidden border-2 border-dashed border-border-secondary hover:border-primary transition-all flex items-center justify-center cursor-pointer relative"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-1">
              <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span className="text-[9px] text-text-tertiary uppercase font-bold">Przesyłanie</span>
            </div>
          ) : formData.imageUrl && !imgError ? (
            <img
              src={getImageSrc(formData.imageUrl)!}
              alt={formData.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-1 p-2">
              <span className="text-xl">📷</span>
              <span className="text-[9px] text-text-tertiary text-center uppercase font-bold">Dodaj obraz</span>
            </div>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {uploadError && (
          <p className="text-[10px] text-red-500 text-center max-w-24">{uploadError}</p>
        )}
      </div>

      {/* Edit Form */}
      <div className="flex-1 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <AdminLabel>Nazwa</AdminLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Tytuł książki"
            />
          </div>
          <div className="space-y-1">
            <AdminLabel>Cena (zł)</AdminLabel>
            <Input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={onChange}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-1">
            <AdminLabel>Stan magazynowy</AdminLabel>
            <Input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={onChange}
              placeholder="0"
            />
          </div>
          <div className="space-y-1">
            <AdminLabel>Rok wydania</AdminLabel>
            <Input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={onChange}
              placeholder="np. 2024"
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <AdminLabel>Opis szczegółowy</AdminLabel>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows={3}
              className="w-full bg-bg-secondary border border-border-secondary rounded-xl p-3 text-sm focus:outline-none focus:border-primary transition-all"
              placeholder="Opis produktu..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <AdminLabel>Zawody</AdminLabel>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-bg-secondary rounded-xl border border-border-secondary">
                {professions?.map((p: any) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onToggleProfession(p.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all border cursor-pointer ${
                      formData.professionIds.includes(p.id)
                        ? "bg-primary text-text-obj border-primary"
                        : "bg-bg-primary text-text-secondary border-border-secondary hover:border-text-tertiary"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <AdminLabel>Kwalifikacje</AdminLabel>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-bg-secondary rounded-xl border border-border-secondary">
                {qualifications?.map((q: any) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => onToggleQualification(q.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all border cursor-pointer ${
                      formData.qualificationIds.includes(q.id)
                        ? "bg-secondary text-text-obj border-secondary"
                        : "bg-bg-primary text-text-secondary border-border-secondary hover:border-text-tertiary"
                    }`}
                  >
                    {q.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row Actions */}
      <div className="flex md:flex-col gap-2 shrink-0 justify-end md:justify-start">
        <Button style="default" onClick={onSave} disabled={isPending || isUploading}>
          Zapisz
        </Button>
        <Button style="outline" onClick={onCancel}>
          Anuluj
        </Button>
      </div>
    </div>
  );
}
