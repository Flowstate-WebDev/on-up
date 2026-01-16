import { useRef } from 'react';

type Props = {
  MaxStock: number
  onAdd: (quantity: number) => void
}

export default function AddToCartForm({ MaxStock, onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      onAdd(Number(inputRef.current.value));
    }
  }

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <form className='flex w-fit' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <input 
        ref={inputRef}
        onClick={handleInputClick}
        className='rounded-tl-lg rounded-bl-lg border border-r-0 border-border-secondary outline-none py-2 px-4 w-20 bg-bg-primary' 
        type="number" 
        min="1" 
        defaultValue={1} 
        max={MaxStock}
      />
      <button className='block rounded-tr-lg rounded-br-lg bg-primary hover:bg-secondary text-text-obj px-8 cursor-pointer'>Dodaj do koszyka</button>
    </form>
  )
}