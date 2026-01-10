import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState, type FormEvent } from 'react';

type Props = {
  product: Product;
};

export default function AddToCartForm({ product }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (quantity < 1) return;
    addToCart(product, quantity);
    alert(`Dodano ${quantity} szt. do koszyka!`);
  };

  return (
    <form className='flex w-fit' onSubmit={handleSubmit}>
      <input
        className='rounded-tl-lg rounded-bl-lg border border-r-0 border-border-secondary outline-none py-2 px-4 w-20 bg-bg-primary'
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
      />
      <button className='block rounded-tr-lg rounded-br-lg bg-primary hover:bg-secondary text-text-obj px-8 cursor-pointer'>
        Dodaj do koszyka
      </button>
    </form>
  )
}