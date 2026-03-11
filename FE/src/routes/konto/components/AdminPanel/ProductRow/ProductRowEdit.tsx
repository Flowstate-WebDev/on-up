import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { AdminLabel } from "@/components/ui/AdminLabel/AdminLabel";
import { getImageSrc } from "@/utils/productUtils";

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

  // Reset image error state when imageUrl changes
  useEffect(() => {
    setImgError(false);
  }, [formData.imageUrl]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Product Image Preview */}
      <div className="w-full md:w-24 h-24 bg-bg-secondary rounded-xl overflow-hidden border border-border-secondary flex items-center justify-center shrink-0">
        {formData.imageUrl && !imgError ? (
          <img
            src={getImageSrc(formData.imageUrl)!}
            alt={formData.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-text-tertiary text-[10px] text-center p-2 uppercase font-bold">
            Preview
          </span>
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
            <AdminLabel>Plik obrazu (np. Photo.webp)</AdminLabel>
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={onChange}
              placeholder="image.webp"
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
        <Button style="default" onClick={onSave} disabled={isPending}>
          Zapisz
        </Button>
        <Button style="outline" onClick={onCancel}>
          Anuluj
        </Button>
      </div>
    </div>
  );
}
