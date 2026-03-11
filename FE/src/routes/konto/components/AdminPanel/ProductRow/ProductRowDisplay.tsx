import { useState } from "react";
import { getImageSrc } from "@/utils/productUtils";

interface ProductRowDisplayProps {
  product: any;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductRowDisplay({
  product,
  onEdit,
  onDelete,
}: ProductRowDisplayProps) {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="w-full md:w-24 h-24 bg-bg-secondary rounded-xl overflow-hidden border border-border-secondary flex items-center justify-center shrink-0">
        {product.imageUrl && !imgError ? (
          <img
            src={getImageSrc(product.imageUrl)!}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-text-tertiary text-[10px] text-center p-2 uppercase font-bold">
            Brak
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-3">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary leading-tight">
              {product.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.professions?.map((p: any) => (
                <span
                  key={p.professionId}
                  className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md uppercase tracking-wider"
                >
                  {p.profession.name}
                </span>
              ))}
              {product.qualifications?.map((q: any) => (
                <span
                  key={q.qualificationId}
                  className="px-2 py-0.5 bg-secondary-light/10 text-text-tertiary text-[10px] font-bold rounded-md uppercase tracking-wider border border-border-secondary"
                >
                  {q.qualification.code}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-primary">{product.price} zł</p>
            <p className="text-[10px] font-bold text-text-tertiary uppercase">
              Stan: {product.stock}
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-text-tertiary hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider cursor-pointer"
          >
            {isExpanded ? "Ukryj opis" : "Pokaż opis"}
            <span
              className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>
          {isExpanded && (
            <div className="mt-2 text-sm text-text-secondary bg-bg-secondary p-3 rounded-xl border border-border-secondary leading-relaxed animate-in slide-in-from-top-2 duration-300">
              {product.description || "Ten produkt nie posiada jeszcze opisu."}
            </div>
          )}
        </div>
      </div>

      {/* Row Actions */}
      <div className="flex md:flex-col gap-2 shrink-0 justify-end md:justify-start">
        <button
          onClick={onEdit}
          className="p-2.5 rounded-xl bg-bg-secondary border border-border-secondary text-text-tertiary hover:text-primary transition-all shadow-sm cursor-pointer"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="p-2.5 rounded-xl bg-bg-secondary border border-border-secondary text-text-tertiary hover:text-red-500 transition-all shadow-sm cursor-pointer"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
