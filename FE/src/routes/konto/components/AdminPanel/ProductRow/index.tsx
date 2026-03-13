import { useState } from 'react';
import { useCreateBook, useUpdateBook, useDeleteBook } from '@/hooks/queries/books/useBooks';
import { useToast } from '@/context/ToastContext';
import { generateSlug } from '@/utils/productUtils';
import { ProductRowDisplay } from './ProductRowDisplay';
import { ProductRowEdit } from './ProductRowEdit';

interface ProductRowProps {
  product?: any;
  isEditing?: boolean;
  isNew?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  professions?: any[];
  qualifications?: any[];
}

export function ProductRow({ 
  product, 
  isEditing: initialEditing = false, 
  isNew = false, 
  onCancel, 
  onSave, 
  professions = [], 
  qualifications = [] 
}: ProductRowProps) {
  const [isEditing, setIsEditing] = useState(initialEditing);
  const { showToast } = useToast();
  
  const updateMutation = useUpdateBook();
  const deleteMutation = useDeleteBook();
  const createMutation = useCreateBook();

  const [formData, setFormData] = useState({
    title: product?.title || '',
    price: product?.price || '',
    stock: product?.stock || 0,
    imageUrl: product?.imageUrl || '',
    description: product?.description || '',
    releaseYear: product?.releaseYear || '',
    professionIds: product?.professions?.map((p: any) => p.professionId) || [],
    qualificationIds: product?.qualifications?.map((q: any) => q.qualificationId) || [],
  });

  const startEditing = () => {
    setFormData({
      title: product.title,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      description: product.description || '',
      releaseYear: product.releaseYear || '',
      professionIds: product.professions?.map((p: any) => p.professionId) || [],
      qualificationIds: product.qualifications?.map((q: any) => q.qualificationId) || [],
    });
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : (name === 'price' ? parseFloat(value) : parseInt(value, 10))) : value
    }));
  };

  const handleSave = async () => {
    if (!formData.title || formData.price === '') {
      showToast('Nazwa i cena są wymagane', 'error');
      return;
    }

    const payload: any = {
      title: formData.title,
      price: Number(formData.price),
      stock: Number(formData.stock) || 0,
      imageUrl: formData.imageUrl,
      description: formData.description,
      releaseYear: formData.releaseYear !== '' ? Number(formData.releaseYear) : null,
      professionIds: formData.professionIds,
      qualificationIds: formData.qualificationIds,
    };

    try {
      if (isNew) {
        payload.slug = generateSlug(formData.title);
        await createMutation.mutateAsync(payload);
        showToast('Dodano nowy produkt', 'success');
      } else {
        await updateMutation.mutateAsync({ id: product.id, data: payload });
        showToast('Zaktualizowano produkt', 'success');
      }
      setIsEditing(false);
      onSave?.();
    } catch (err: any) {
      showToast('Błąd: ' + (err.message || 'Błąd serwera'), 'error');
    }
  };

  const handleDelete = async () => {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      try {
        await deleteMutation.mutateAsync(product.id);
        showToast('Usunięto produkt', 'success');
      } catch (err: any) {
        showToast('Błąd: ' + (err.message || 'Błąd serwera'), 'error');
      }
    }
  };

  const toggleProfession = (id: string) => {
    setFormData(prev => ({
      ...prev,
      professionIds: prev.professionIds.includes(id) 
        ? prev.professionIds.filter((pId: string) => pId !== id)
        : [...prev.professionIds, id]
    }));
  };

  const toggleQualification = (id: string) => {
    setFormData(prev => ({
      ...prev,
      qualificationIds: prev.qualificationIds.includes(id) 
        ? prev.qualificationIds.filter((qId: string) => qId !== id)
        : [...prev.qualificationIds, id]
    }));
  };

  return (
    <div className={`
      bg-bg-primary rounded-2xl border transition-all duration-300 
      ${isEditing 
        ? 'border-primary ring-1 ring-primary/20 p-6 shadow-md' 
        : 'border-border-secondary p-4 hover:border-primary/50'
      }
    `}>
      {isEditing ? (
        <ProductRowEdit 
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={() => { setIsEditing(false); isNew && onCancel?.(); }}
          onToggleProfession={toggleProfession}
          onToggleQualification={toggleQualification}
          isPending={updateMutation.isPending || createMutation.isPending}
          professions={professions}
          qualifications={qualifications}
        />
      ) : (
        <ProductRowDisplay 
          product={product}
          onEdit={startEditing}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
