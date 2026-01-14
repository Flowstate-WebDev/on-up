import { Link } from '@tanstack/react-router';

import type { Product } from '@/data/products';
import Tag from '../UI/Reusable/Tag';
import ProductPrice from './ProductPrice';

type Props = {
  data: Product
}

export default function ProductCard({ data }: Props) {
  return (
    <Link 
      to="/sklep/$productId" 
      params={{ productId: data.slug }} 
      className='w-full max-w-72 shadow-md rounded-lg overflow-clip grid grid-rows-subgrid row-span-4 gap-y-0'
    >
      <div className="aspect-4/5 relative row-start-1">
        <img src={`/images/books/${data.imageUrl}`} alt={`Podręcznik ${data.title}`} className="object-cover w-full h-full" />
      </div>
      <div className='bg-bg-secondary p-2 grid grid-rows-subgrid row-start-2 row-span-3 gap-y-0'>
        <h2 className='font-bold leading-tight line-clamp-3 overflow-hidden row-start-1 text-sm sm:text-base mb-2'>{data.title}</h2>
        <div className='row-start-2'>
          <h3 className='text-[10px] uppercase tracking-wider text-text-tertiary'>Kwalifikacje:</h3>
          <ul className='flex flex-wrap gap-1'>
            {
              data.qualifications.length > 0 ? (
                data.qualifications.map((item, idx) => (
                  <li key={idx}><Tag>{item.qualification.code}</Tag></li>
                ))
              ) : (
                <p className='text-xs text-text-secondary italic'>Nie podano</p>
              )
            }
          </ul>
        </div>
        <div className='flex justify-end self-end row-start-3'>
          <ProductPrice price={data.price} />
        </div>
      </div>
    </Link>
  )
}
