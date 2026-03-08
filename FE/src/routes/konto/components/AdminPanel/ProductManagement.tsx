import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { useBooks, useProfessions, useQualifications } from '@/hooks/queries/books/useBooks';
import { ProductRow } from './ProductRow';

export function ProductManagement() {
  const { data: products, isLoading } = useBooks();
  const { data: professions } = useProfessions();
  const { data: qualifications } = useQualifications();
  
  const [isAdding, setIsAdding] = useState(false);

  if (isLoading) return <p className="text-center py-10 text-text-tertiary">Ładowanie produktów...</p>;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">Zarządzanie Produktami</h2>
        <Button 
          style="default" 
          type="button" 
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          + Dodaj Produkt
        </Button>
      </div>

      <div className="space-y-4">
        {isAdding && (
          <ProductRow 
            isEditing={true} 
            isNew={true} 
            onCancel={() => setIsAdding(false)} 
            onSave={() => setIsAdding(false)}
            professions={professions}
            qualifications={qualifications}
          />
        )}
        
        {products?.length === 0 && !isAdding && (
          <div className="bg-bg-primary rounded-2xl p-8 text-center border border-border-secondary border-dashed">
            <p className="text-text-tertiary">Brak produktów. Dodaj swój pierwszy produkt!</p>
          </div>
        )}

        {products?.map((product: any) => (
          <ProductRow 
            key={product.id} 
            product={product} 
            professions={professions}
            qualifications={qualifications}
          />
        ))}
      </div>
    </div>
  );
}
